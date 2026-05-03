'use client';

import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface HeadlessCheckoutFormProps {
  selectedSlot: string;
  onBack: () => void;
}

const HeadlessCheckoutForm = ({ selectedSlot, onBack }: HeadlessCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPayLoading, setIsPayLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsPayLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Ensure this page exists in /app directory
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      // Basic error handling for the terminal
      console.error("[GATEWAY_ERROR]:", error.message);
      alert(error.message);
    }
    
    setIsPayLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* Back button — top, always visible */}
      <button 
        type="button" 
        onClick={onBack} 
        className="text-[9px] text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-pointer flex items-center gap-2"
      >
        ← Change Schedule
      </button>
      
      {/* Window Summary */}
      <div className="border border-white/10 p-5 bg-white/[0.02] space-y-2">
        <p className="text-[10px] text-white uppercase tracking-widest font-bold">03. Secure Reservation</p>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-white font-mono font-bold">
            {new Date(selectedSlot).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm text-phoenix-orange font-mono font-bold uppercase">
            {new Date(selectedSlot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <p className="text-[10px] text-white/80 tracking-wide leading-relaxed pt-2">
          Discovery call — we learn your environment, you learn how we work.
        </p>
        <p className="text-[9px] text-white/60 tracking-wide leading-relaxed">
          Applied toward your project if you move forward. Non-refundable if not.
        </p>
      </div>

      {/* The Stripe iFrame Container */}
      <div className="bg-white/[0.03] p-4 border border-white/10">
        <PaymentElement 
          options={{ layout: 'tabs' }} 
          onChange={(e) => setIsComplete(e.complete)}
        />
      </div>

      <div className="space-y-4 pt-4">
        <button 
          type="submit"
          disabled={isPayLoading || !stripe || !isComplete}
          className={`
            w-full font-inter font-black uppercase text-xs py-5 tracking-[0.4em] transition-all duration-500
            ${isPayLoading || !isComplete
                ? "bg-[#13A940]/30 text-black/40 cursor-wait grayscale-[0.5]" 
                : "bg-[#13A940] text-black cursor-pointer [filter:drop-shadow(0_0_15px_rgba(19,169,64,0.6))] hover:[filter:drop-shadow(0_0_25px_rgba(19,169,64,0.8))] hover:brightness-110"
            }
          `}
        >
          {isPayLoading ? "AUTHORIZING..." : "SECURE MY DISCOVERY CALL — $250"}
        </button>
      </div>

      <p className="text-[9px] text-white/30 text-center uppercase tracking-widest leading-relaxed">
        Secure Encrypted Transaction via Stripe Gateway
      </p>
    </form>
  );
};

// Explicit default export
export default HeadlessCheckoutForm;