'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { PhoenixLogo } from '../../components/PhoenixLogo';
import { getAvailableSlots, createPaymentIntent } from '@/app/actions';
import HeadlessCheckoutForm from './HeadlessCheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface AuditModalProps {
  email: string;
  onClose: () => void;
}

const AuditModal = ({ email: initialEmail, onClose }: AuditModalProps) => {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState(initialEmail);
  const [selectedVectors, setSelectedVectors] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [slots, setSlots] = useState<Record<string, any[]>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const EVENT_TYPE_ID = 5474611;
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Logic to calculate the dynamic date range for the header
  const getRangeDisplay = () => {
    const sorted = Object.keys(slots).sort();
    if (sorted.length === 0) return 'SELECT DATE';
    
    const first = new Date(sorted[0] + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const last = new Date(sorted[sorted.length - 1] + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return first === last ? `[${first}]` : `[${first} — ${last}]`;
  };

  const loadSlots = async () => {
    setIsLoading(true);
    const start = new Date().toISOString();
    // 60 day window to ensure we see the new availability
    const end = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); 
    
    try {
      const data = await getAvailableSlots(EVENT_TYPE_ID, start, end);
      console.log("CAL_API_DATA_RECEIVED:", data); // Check F12 Console for this!

      if (!data) {
        setSlots({});
        return;
      }

      // v2 often returns an object: { "2026-04-24": [...] }
      // If it's already an object, we just use it.
      if (!Array.isArray(data) && typeof data === 'object') {
        setSlots(data);
      } 
      // If it's an array, we group it manually using the local date key.
      else if (Array.isArray(data)) {
        const grouped: Record<string, any[]> = {};
        data.forEach((slot: any) => {
          const dateObj = new Date(slot.time);
          const y = dateObj.getFullYear();
          const m = String(dateObj.getMonth() + 1).padStart(2, '0');
          const d = String(dateObj.getDate()).padStart(2, '0');
          const localKey = `${y}-${m}-${d}`;
          
          if (!grouped[localKey]) grouped[localKey] = [];
          grouped[localKey].push(slot);
        });
        setSlots(grouped);
      }
    } catch (error) {
      console.error("Failed to load availability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const preparePayment = async () => {
    setIsProcessing(true); 
    try {
      const { clientSecret } = await createPaymentIntent({
        email: userEmail,
        slot: selectedSlot!,
        name: name
      });
      
      if (clientSecret) {
        setClientSecret(clientSecret);
        setStep(3);
      }
    } catch (err) {
      console.error("Stripe Intent Failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (step === 2) loadSlots();
  }, [step]);

  const handleBookingSelection = (time: string) => {
    setSelectedSlot(time);
  };

  const toggleVector = (vector: string) => {
    setSelectedVectors(prev => 
      prev.includes(vector) ? prev.filter(v => v !== vector) : [...prev, vector]
    );
  };

  const options = ["Automation", "Performance/Stability", "Governance", "Training", "Other"];

  // Boolean to check if both date and time are selected
  const isReadyToProceed = !!selectedDate && !!selectedSlot;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md px-4 py-6 overflow-y-auto">
      <div className="bg-[#0D0D0D] border border-phoenix-orange/20 max-w-lg w-full p-8 md:p-10 relative shadow-[0_0_80px_rgba(255,102,0,0.05)] my-auto">

        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <PhoenixLogo 
              src="/images/branding/logo_full_english.svg" 
              className="h-auto w-24 md:w-32"
            />
          </Link>
        </div>
        
        {/* Header */}
        <div className="mb-8 border-l-2 border-phoenix-orange pl-5">
          <p className="text-phoenix-orange font-mono text-[9px] font-black tracking-[0.3em] uppercase mb-1">
            Starting Vector / Phase 0{step}
          </p>
          <h2 className="text-3xl font-inter font-black text-white uppercase tracking-tighter leading-none">
            {step === 1 && "Calibration Details"}
            {step === 2 && "Select a Window"}
            {step === 3 && "Secure the Slot"}
          </h2>
        </div>

        {/* PHASE 01: CONTEXT */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
              <label className="text-[10px] text-white uppercase tracking-widest font-bold">Contact Email</label>
              <input 
                type="email" 
                value={userEmail} 
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-2 text-white font-sans text-sm focus:border-phoenix-orange outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-white uppercase tracking-widest font-bold">Contact Person</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name" 
                  className="w-full bg-black border border-white/20 px-4 py-2 text-white text-sm outline-none focus:border-phoenix-orange transition-colors" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-white uppercase tracking-widest font-bold">Organization</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company Name" 
                  className="w-full bg-black border border-white/20 px-4 py-2 text-white text-sm outline-none focus:border-phoenix-orange transition-colors" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] text-white uppercase tracking-widest font-bold block">
                What can we help with?<span className="text-phoenix-orange italic capitalize"> (Select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleVector(option)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border cursor-pointer ${
                      selectedVectors.includes(option)
                        ? "bg-phoenix-orange border-phoenix-orange text-black"
                        : "bg-transparent border-white/10 text-white hover:border-white/30"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-[#13A940] text-black font-inter font-black uppercase text-xs py-4 tracking-[0.4em] hover:brightness-110 transition-all cursor-pointer"
            >
              Check Availability
            </button>
          </div>
        )}

        {/* PHASE 02: SCHEDULING */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {isLoading ? (
              <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 bg-white/[0.01]">
                <p className="text-[10px] text-phoenix-orange animate-pulse uppercase tracking-[0.3em]">Fetching Availability...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] text-white uppercase tracking-widest font-bold">
                      01. Select Meeting Date
                    </label>
                    <p className="text-[9px] text-phoenix-orange font-mono uppercase tracking-widest">
                      {getRangeDisplay()}
                    </p>
                  </div>

                  <div className="grid grid-cols-7 gap-1 border-b border-white/20 pb-2">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-[8px] text-bright-white uppercase tracking-wide">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {/* Length check to prevent empty grid display */}
                    {Object.keys(slots).length > 0 ? (
                      Object.keys(slots).map((dateKey, index) => {
                        // Consistent T12:00:00 anchor for grid boxes
                        const dateObj = new Date(dateKey + 'T12:00:00'); 
                        const dayOfMonth = dateObj.getDate();
                        const dayOfWeek = dateObj.getDay();

                        // Identify if we've crossed into a new month
                        const prevDateKey = Object.keys(slots)[index - 1];
                        const isNewMonth = prevDateKey && new Date(prevDateKey + 'T12:00:00').getMonth() !== dateObj.getMonth();

                        const isFirstItem = index === 0;
                        const isFirstOfMonth = dayOfMonth === 1;
                        const gridStyle = (isFirstItem || isFirstOfMonth) ? { gridColumnStart: dayOfWeek + 1 } : {};

                        return (
                          <React.Fragment key={dateKey}>
                            {/* Blue visual divider inserted between months */}
                            {isNewMonth && (
                              <div className="col-span-7 flex items-center gap-3 py-6">
                                <div className="h-[1px] flex-grow bg-blue-flame/30"></div>
                                <span className="text-[10px] font-mono text-blue-flame uppercase tracking-[0.4em]">
                                  {dateObj.toLocaleDateString('en-US', { month: 'long' })}
                                </span>
                                <div className="h-[1px] flex-grow bg-blue-flame/30"></div>
                              </div>
                            )}

                            <button
                              key={dateKey}
                              type="button"
                              onClick={() => {
                                setSelectedDate(dateKey);
                                setSelectedSlot(null);
                              }}
                              style={gridStyle}
                              className={`aspect-square flex flex-col items-center justify-center border transition-all ${
                                selectedDate === dateKey 
                                  ? "bg-phoenix-orange text-black" // High-contrast solid active state
                                  : "border-white/10 text-white hover:border-white/40 bg-white/[0.02]"
                              }`}
                            >
                              <span className="text-xs font-inter">{dayOfMonth}</span>
                            </button>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      // Explicit fallback UI if slots array returns empty from API
                      <div className="col-span-7 py-10 text-center border border-dashed border-white/5">
                        <p className="text-[10px] text-white/20 uppercase tracking-widest">No availability found</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedDate && slots[selectedDate] && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 mt-8">
                    <label className="text-[10px] text-white uppercase tracking-widest font-bold block">
                      02. Select Starting Time (30 Mins) <span className="text-phoenix-orange">[{selectedDate}]</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {slots[selectedDate].map((slot: any) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedSlot(slot.time)}
                          // Hover & Active strictly Orange. No Green here.
                          className={`py-3 text-[10px] font-mono border transition-all text-center uppercase ${
                            selectedSlot === slot.time
                              ? "bg-phoenix-orange text-black border-phoenix-orange"
                              : "border-white/20 text-bright-white hover:bg-phoenix-orange hover:text-black hover:border-phoenix-orange"
                          }`}
                        >
                          {new Date(slot.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Main action button at the bottom of Phase 02 */}
            <div className="pt-6 space-y-4">
              <button 
                type="button" 
                // Disable if already processing
                disabled={!isReadyToProceed || isProcessing} 
                onClick={preparePayment}
                className={`
                    w-full font-inter font-black text-sm uppercase tracking-[0.2em] whitespace-nowrap
                    px-6 py-4 transition-all duration-500 ease-out active:scale-[0.98]
                    
                    ${isReadyToProceed && !isProcessing
                      ? "bg-[#13A940] text-black cursor-pointer opacity-100 [filter:drop-shadow(0_0_15px_rgba(19,169,64,0.6))] hover:[filter:drop-shadow(0_0_25px_rgba(19,169,64,0.8))] hover:brightness-110"
                      : "bg-[#13A940]/30 text-black/40 cursor-not-allowed [filter:none] grayscale-[0.3]" 
                    }
                `}
              >
                {/* Dynamic button text */}
                {isProcessing ? "SECURING SLOT..." : "Confirm Meeting Window"}
              </button>

              <button 
                onClick={() => setStep(1)} 
                className="text-[9px] text-white/40 uppercase tracking-widest hover:text-white pt-4 cursor-pointer"
              >
                [Back to basic info]
              </button>
            </div>
          </div>
        )}

        {/* PHASE 03: SECURITY / PAYMENT */}
        {step === 3 && clientSecret && (
          <Elements stripe={stripePromise} options={{ 
            clientSecret,
            appearance: { 
              theme: 'night', 
              variables: { 
                colorPrimary: '#FF6600',
                colorBackground: '#0D0D0D', 
                colorText: '#ffffff',
                borderRadius: '0px'
              } 
            } 
          }}>
            <HeadlessCheckoutForm selectedSlot={selectedSlot!} onBack={() => setStep(2)} />
          </Elements>
        )}

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors font-mono text-[10px] cursor-pointer"
        >
          Close  X
        </button>
      </div>
    </div>
  );
};

export default AuditModal;