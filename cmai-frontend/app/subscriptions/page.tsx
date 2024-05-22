"use client";

import { useState } from "react";

const Subscription = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState("basic");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle subscription form submission
    console.log("Subscription Plan:", subscriptionPlan);
    console.log("Payment Method:", paymentMethod);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Subscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subscriptionPlan" className="block font-bold mb-2">
            Subscription Plan
          </label>
          <select
            id="subscriptionPlan"
            value={subscriptionPlan}
            onChange={(e) => setSubscriptionPlan(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="basic">Basic</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block font-bold mb-2">
            Payment Method
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Credit Card
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              PayPal
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Subscription
        </button>
      </form>
    </div>
  );
};

export default Subscription;