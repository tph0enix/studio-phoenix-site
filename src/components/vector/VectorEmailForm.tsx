'use client';

import { useRef, useState, useEffect } from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { sendVerificationCode } from '@/app/actions';
import AuditModal from './AuditModal';
import VerifyModal from './VerifyModal';

const VectorEmailForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifyOpen, setIsVerifyOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const turnstileRef = useRef<TurnstileInstance>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    async function handleAction(formData: FormData) {
        if (!isValidEmail) return;
        setIsLoading(true);

        // Only send verification code — do NOT store email yet
        await sendVerificationCode(email);

        setIsLoading(false);
        setIsVerifyOpen(true);
    }

    const handleReset = () => {
        setIsVerifyOpen(false);
        setIsModalOpen(false);
        setIsLoading(false);
        setEmail('');
        setToken(null);
        turnstileRef.current?.reset();
    };

    return (
        <>
            <p className="text-sm text-white font-inter font-bold uppercase tracking-widest text-center px-6 mb-4">
                Start with a discovery call — <span className="text-phoenix-orange">$250</span>, applied toward your project.
            </p>
            <form 
                key={isMounted ? 'hydrated' : 'empty'}    
                ref={formRef}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await handleAction(formData);
                }}
                className="flex flex-col md:flex-row mb-7 items-stretch gap-0 w-full max-w-xl mx-auto border border-white/30 shadow-2xl"
            >
                <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Business Email"
                    className="flex-grow bg-black/60 text-white px-6 py-3 outline-none focus:ring-1 focus:ring-[#13A940] transition-all font-sans font-light placeholder:text-ash-gray/50"
                />
                <button
                    type="submit"
                    disabled={!isMounted || !isValidEmail || !token || isLoading}
                    className={`
                        font-inter font-black text-sm uppercase tracking-[0.2em] whitespace-nowrap
                        px-6 py-4 transition-all duration-500 ease-out active:scale-[0.98]
                        
                        ${isValidEmail && token && isMounted && !isLoading
                            ? "bg-[#13A940] text-black cursor-pointer opacity-100 [filter:drop-shadow(0_0_15px_rgba(19,169,64,0.6))] hover:[filter:drop-shadow(0_0_25px_rgba(19,169,64,0.8))] hover:brightness-110"
                            : "bg-[#13A940]/30 text-black/40 cursor-not-allowed [filter:none] grayscale-[0.3]" 
                        }
                    `}
                >
                    {isLoading ? 'Igniting...' : 'Begin Ignition'}
                </button>

                <input type="hidden" name="cf-turnstile-response" value={token || ''} />
                <div className="flex justify-center md:justify-start">
                    {isMounted && (
                        <Turnstile 
                            ref={turnstileRef}
                            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!} 
                            onSuccess={(token) => setToken(token)}
                            options={{
                                theme: 'dark',
                                appearance: 'interaction-only'
                            }}
                        />
                    )}
                </div>
            </form>

            {/* VERIFY MODAL */}
            {isVerifyOpen && (
                <VerifyModal
                    email={email}
                    onVerified={() => {
                        setIsVerifyOpen(false);
                        setIsModalOpen(true);
                    }}
                    onClose={handleReset}
                />
            )}

            {/* AUDIT MODAL */}
            {isModalOpen && (
                <AuditModal 
                    email={email} 
                    onClose={handleReset}
                />
            )}
        </>
    );
};

export default VectorEmailForm;
