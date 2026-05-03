'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PhoenixLogo } from '../../components/PhoenixLogo';
import { sendVerificationCode, verifyCode, subscribeUser } from '@/app/actions';

interface VerifyModalProps {
  email: string;
  onVerified: () => void;
  onClose: () => void;
}

const VerifyModal = ({ email, onVerified, onClose }: VerifyModalProps) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async () => {
    if (code.length !== 6) return;
    setIsVerifying(true);
    setError(null);

    const result = await verifyCode(email, code);

    if (result.success) {
      // Only store email in DB after successful verification
      const [local, domain] = email.split('@');
      await subscribeUser(email);
      onVerified();
    } else {
      setError(result.error || 'Invalid or expired code.');
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setIsResending(true);
    setError(null);
    setCode('');

    await sendVerificationCode(email);

    setIsResending(false);
    setCanResend(false);
    setCooldown(30);
  };

  const canVerify = code.length === 6 && !isVerifying;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md px-4 py-6 overflow-y-auto">
      <div className="bg-[#0D0D0D] border border-phoenix-orange/20 max-w-lg w-full p-8 md:p-10 relative shadow-[0_0_80px_rgba(255,102,0,0.05)] my-auto">

        {/* Logo */}
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
          <h2 className="text-3xl font-inter font-black text-white uppercase tracking-tighter leading-none">
            Check Your Inbox
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-6">

          <p className="text-white/60 text-sm leading-relaxed">
            We sent a 6-digit code to <span className="text-white font-bold">{email}</span>. Enter it below to continue.
          </p>

          {/* Code Input */}
          <div className="space-y-1">
            <label className="text-[10px] text-white uppercase tracking-widest font-bold">
              Verification Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => {
                setError(null);
                setCode(e.target.value.replace(/\D/g, ''));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canVerify) handleVerify();
              }}
              placeholder="000000"
              autoFocus
              className="w-full bg-black border border-white/20 px-4 py-3 text-white text-xl font-inter font-bold tracking-[0.5em] outline-none focus:border-phoenix-orange transition-colors text-center"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-[11px] text-red-400 uppercase tracking-widest">
              {error}
            </p>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!canVerify}
            className={`w-full font-inter font-black uppercase text-xs py-4 tracking-[0.4em] transition-all
              ${canVerify
                ? "bg-[#13A940] text-black cursor-pointer hover:brightness-110 [filter:drop-shadow(0_0_15px_rgba(19,169,64,0.6))] hover:[filter:drop-shadow(0_0_25px_rgba(19,169,64,0.8))]"
                : "bg-[#13A940]/30 text-black/40 cursor-not-allowed"
              }
            `}
          >
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
          </button>

          {/* Resend */}
          <p className="text-[9px] text-white/40 uppercase tracking-widest text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-phoenix-orange hover:text-white transition-colors cursor-pointer"
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </button>
            ) : (
              <>Resend available in {cooldown}s</>
            )}
          </p>

        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors font-mono text-[10px] cursor-pointer"
        >
          Close X
        </button>

      </div>
    </div>
  );
};

export default VerifyModal;
