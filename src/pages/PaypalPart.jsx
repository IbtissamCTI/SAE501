import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalPart({ prix, titre, sessionId, onSuccess }) {

    const paypalOptions = {
        "client-id": "test", // Gardez "test" pour la Sandbox
        currency: "EUR",
        intent: "capture"
    };

    const handlePayPalSuccess = async (details, data) => {
        const authData = localStorage.getItem('authData');
        const userStr = localStorage.getItem('user');

        // Vérification de sécurité
        if (!userStr) {
            alert("Session expirée. Veuillez vous reconnecter.");
            return;
        }

        const user = JSON.parse(userStr);
        // On récupère l'ID (gère id, idUser ou id_user au cas où)
        const userId = user.id || user.idUser || user.id_user;

        if (!userId) {
            console.error("Données utilisateur incomplètes :", user);
            alert("Erreur technique : ID utilisateur introuvable. Veuillez vous déconnecter et reconnecter.");
            return;
        }
        
        try {
            // L'URL contient maintenant l'idApprenti correct
            const response = await fetch(`http://localhost:8080/api/paypal/capture-paiement?idSession=${sessionId}&idApprenti=${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${authData}`
                }
            });

            if (response.ok) {
                if (onSuccess) onSuccess();
                alert(`Inscription validée ! Merci ${details.payer.name.given_name}`);
            } else {
                const errorText = await response.text(); 
                console.error("Erreur Backend:", errorText);
                alert("Erreur lors de l'inscription : " + errorText);
            }
        } catch (error) {
            console.error(error);
            alert("Erreur de connexion au serveur.");
        }
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <div className="relative z-0 w-full"> 
                <PayPalButtons
                    style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                description: `Inscription ${titre}`,
                                amount: {
                                    value: prix.toString()
                                }
                            }]
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        handlePayPalSuccess(details, data);
                    }}
                    onError={(err) => {
                        console.error("Erreur PayPal:", err);
                        alert("Le paiement a échoué ou a été annulé.");
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
}