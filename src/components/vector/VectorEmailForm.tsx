'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Turnstile } from '@marsidev/react-turnstile';
import { subscribeUser } from '@/app/actions';

const VectorEmailForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    // 1. The Logic Lock: Start as 'true' to match the server's expected default
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // 2. Component Ignition
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 1. Validation Logic
    // Ensures there is text before and after the @ and a dot in the domain.
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    async function handleAction(formData: FormData) {
        // Extra safety catch
        if (!isValidEmail) return;

        const result = await subscribeUser(formData);
        
        if (result.success) {
            router.push('/vector/options');
        } else {
            alert(result.error);
        }
    }

    return (
        <form 
            key={isMounted ? 'hydrated' : 'empty'}    
            ref={formRef}
            action={handleAction}
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
                disabled={!isMounted || !isValidEmail || !token}
                className={`
                    /* BASE ENGINE STATE */
                    font-inter font-black text-sm uppercase tracking-[0.2em] whitespace-nowrap
                    px-6 py-4 transition-all duration-500 ease-out active:scale-[0.98]
                    
                    ${isValidEmail && token && isMounted
                    ? "bg-[#13A940] text-black cursor-pointer opacity-100 [filter:drop-shadow(0_0_15px_rgba(19,169,64,0.6))] hover:[filter:drop-shadow(0_0_25px_rgba(19,169,64,0.8))] hover:brightness-110"
                    : "bg-[#13A940]/30 text-black/40 cursor-not-allowed [filter:none] grayscale-[0.3]" 
                    }
                `}
            >Get Started</button>

            <input type="hidden" name="cf-turnstile-response" value={token || ''} />
            <div className="flex justify-center md:justify-start">
                {/* 4. Only render Turnstile once mounted to avoid server-side interference */}
                {isMounted && (
                    <Turnstile 
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
    );
};

export default VectorEmailForm;