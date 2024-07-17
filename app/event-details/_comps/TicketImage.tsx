"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

interface TicketPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string; // Add price as a prop
}

const stripePromise = loadStripe(
  "pk_test_51PdaYUDnjRMUmEq7UoQEFnKXUZyJdFD0ien2h6GOx9m2jxcR12PeXvBSegYLfUKfeRkONKCk4Tmh2Jgd3mPBiCWX00Es3lsthj"
);

const TicketPurchaseModal: React.FC<TicketPurchaseModalProps> = ({
  isOpen,
  onClose,
  price,
}) => {
  const [email, setEmail] = useState<string>("");

  const handlePay = async () => {
    try {
      const response = await fetch("/actions/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, price }), // Include price in the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const session = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Purchase Ticket</h2>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePay}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Pay with Stripe
              </button>
              <button
                onClick={onClose}
                className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketPurchaseModal;
