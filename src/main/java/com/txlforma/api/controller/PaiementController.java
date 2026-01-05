package com.txlforma.api.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import com.txlforma.api.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paiement")
public class PaiementController {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @Autowired
    private SessionService sessionService;

    /**
     * ÉTAPE 1 : Créer une session de paiement Stripe
     * Cette route génère l'URL vers laquelle l'apprenti sera redirigé pour payer.
     */
    @PostMapping("/creer-session")
    public ResponseEntity<String> creerSessionPaiement(@RequestParam Long idSession, @RequestParam Long idApprenti) {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                // URLs de redirection pour le front-end React
                .setSuccessUrl("http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:3000/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("eur")
                                .setUnitAmount(50000L) // 500.00€ (Stripe utilise les centimes)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Inscription Formation")
                                        .build())
                                .build())
                        .build())
                // On stocke les IDs dans les métadonnées pour les récupérer dans le Webhook
                .putMetadata("idSession", idSession.toString())
                .putMetadata("idApprenti", idApprenti.toString())
                .build();

        try {
            Session session = Session.create(params);
            return ResponseEntity.ok(session.getUrl());
        } catch (StripeException e) {
            return ResponseEntity.status(500).body("Erreur Stripe : " + e.getMessage());
        }
    }

    /**
     * ÉTAPE 2 : Webhook Stripe
     * Cette route est appelée par Stripe AUTOMATIQUEMENT une fois le paiement réussi.
     */
    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        Event event;
        try {
            // Vérification de la signature pour sécuriser l'endpoint
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erreur de signature Webhook");
        }

        // Si le paiement est terminé avec succès
        if ("checkout.session.completed".equals(event.getType())) {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();

            if (dataObjectDeserializer.getObject().isPresent()) {
                Session sessionStripe = (Session) dataObjectDeserializer.getObject().get();

                // On récupère les IDs cachés dans les métadonnées
                Long idSession = Long.parseLong(sessionStripe.getMetadata().get("idSession"));
                Long idApprenti = Long.parseLong(sessionStripe.getMetadata().get("idApprenti"));

                // ✅ ACTION FINALE : Inscription en base de données
                sessionService.inscrireApprenti(idSession, idApprenti);
                System.out.println("Paiement validé : Apprenti " + idApprenti + " inscrit à la session " + idSession);
            }
        }

        return ResponseEntity.ok("Success");
    }
}