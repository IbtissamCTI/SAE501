import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalPart({ prix, titre, sessionId, onSuccess }) {

    const paypalOptions = {
        "client-id": "AaB-IEhQiH6g-E3g-t1jLxEcmHz0eaHSPdPdByx_a_lWeLEzeSSZqsPpvi8sE9ZXk4FEK-_o7OaKlD9y",
        currency: "EUR",
        intent: "capture"
    };

    const handlePayPalSuccess = async (details, data) => {
        const authData = localStorage.getItem('authData');
        
        try {
            const response = await fetch(`http://localhost:8080/api/paypal/capture-paiement?idSession=${sessionId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${authData}`
                }
            });

            if (response.ok) {
                if (onSuccess) onSuccess();
                alert(`Inscription validée pour la session ! Merci ${details.payer.name.given_name}`);
            } else {
                alert("Paiement PayPal reçu, mais erreur lors de l'enregistrement en base.");
            }
        } catch (error) {
            console.error(error);
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
                        console.error(err);
                        alert("Le paiement a été annulé ou a échoué.");
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
}