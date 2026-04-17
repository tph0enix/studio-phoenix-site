"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { geistSans, inter, smashHit } from "../../app/fonts";

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
    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] items-center px-6 py-12 md:px-10">
                <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.6fr_1.4fr]">
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

                    <div className="flex flex-col items-center text-center lg:items-center">
                        
                            <div className="mb-3 flex w-full justify-center">
                                <Image
                                    src="/images/branding/logo_full.svg"
                                    alt="Studio Phoenix logo"
                                    width={400}
                                    height={100}
                                    className="h-auto w-32 md:w-200"
                                />
                            </div>

                            <div className="mb-25 flex w-full justify-center">
                                <p className={`${geistSans.className} mb-3 text-sm uppercase tracking-[1.0em] text-white`}>A world real-born</p>
                            </div>

                            <div className={`${inter.className} mb-25 w-full text-white text-center`}>
                                    <h1 className="tracking-[0.1em]">
                                        <span className="md:text-5xl font-extrabold">Truth refined. Meaning reborn.</span><br />
                                        <span className="block md:text-2xl font-extralight mt-2 tracking-normal">From the ashes of the digital facade, rises the fire of the real.</span>
                                    </h1>
                                    <p className="font-medium mt-10 md:text-base tracking-[0.2em]">(And we brought cookies!)</p>
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

/*
Notes:
- add glow feature
- add dark glass look for sections below, possibly with varying color borders or background tints
- make sure Tris gets animated when scrolling
- add a gradient line horizontally on the left and right of the logi, as if continuing through
- make the text on the page pop somehow
- possibly different background--current one is very busy and a bit pixelated looking
- color the button
- customize button text
- customize email text to be less boring
- connect the email & button in a single piece, like Github.com
- animate Tris floating in space--very subtly, like limb movement & blinking
- maybe try different fonts?
- hierarchy of logo + motto matches hierarchy of hero title and hero text--too mirrored, needs variety
- text does not pop; needs color
- add parallax effect when scrolling?
- email piece needs to be interesting, memorable, and unique
- need more fire insignia
- possibly a section where Tris turns into a pixelated character? Maybe with the data section? That would be cool.
- add captcha with custom robot thingy
- tie "truth refined" and "meaning reborn" parts to each of the trivia, data consultancy, education, and manga sections
- adjust lighting direction as Tris moves
- make shadows on Tris darker
- make Tris pop more against background
- add icons to get to the various pages easily, while keeping the page flow smooth
- add more "computer-esque" parts and more "artistic" parts, to indicate we use both
*/