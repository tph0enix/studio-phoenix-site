"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { geistSans, geistMono } from "../../app/fonts";

const realBornWords = [
    "Intelligence",
    "Storytelling",
    "Learning",
    "Beauty",
    "Curiosity",
    "Meaning",
];

//from mismanaged data comes real intelligence
//from cliche entertainment comes true storytelling
//from dry facts comes passionate learning
//from synthetic art comes real beauty
//from placeholders come purpose
//from the shallow comes sincerity

//three standards:
//- larger than life
//- straight to the point
//- beautiful & catchy
//- still humorous

export default function SectionHero() {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % realBornWords.length);
        }, 2600);

        return () => clearInterval(interval);
    }, []);

    const currentWord = realBornWords[wordIndex];

    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/backgrounds/starfield.jpeg"
                    alt="Starfield"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/70" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-12 md:px-10">
                <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-sm">
                            <Image
                                src="/images/characters/tris-floating-neutral.png"
                                alt="Tris floating"
                                width={700}
                                height={900}
                                priority
                                className="h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center lg:items-start">
                        <div className="mb-6 flex w-full justify-center">
                            <Image
                                src="/images/branding/logo_full.svg"
                                alt="Studio Phoenix logo"
                                width={400}
                                height={400}
                                className="h-auto w-32 md:w-200"
                            />
                        </div>

                        <div className="mb-6 flex w-full justify-center">
                            <p className={`${geistSans.variable} ${geistMono.variable} mb-3 text-sm uppercase tracking-[1.0em] text-white/70`}>
                                A world real-born
                            </p>
                        </div>

                        {/*
                        <div className="mb-6-min-h-[3.5rem] text-2xl text-white/90 md:text-4xl">
                            <span className="font-medium">{currentWord}</span> {' '}
                            <span className="text-white/75">real-born</span>
                        </div>
                        */}

                        <div className="mb-6 w-full text-base leading-7 text-white/80 text-center">
                                <p className="font-normal text">The world became fake.</p>
                                <p className="font-bold text-2xl mt-1">We took that personally.</p>
                                <p className="font-normal italic text-xl mt-7"><i>Watch us go real-born.</i></p>
                        </div>

                        <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-white placeholder:text-white/45 outline-none backdrop-blur-sm transition focus:border-white/45"
                            />
                            <button
                                type="submit"
                                className="h-12 rounded-full bg-white px-6 font-medium text-black transition hover:scale-[1.01] hover:bg-white/90"
                            >
                                Stay in orbit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}