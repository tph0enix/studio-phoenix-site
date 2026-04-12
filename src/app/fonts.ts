import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
/*
export const smashHit = localFont({
    src: [
        {
            path: "@/public/fonts/Smash-Hit.ttf",
            weight: "400",
            style: "normal",
        }
    ],
    variable: "--font-custom",
});
*/
export const inter = localFont({
    src: [
        {
            path: "../../public/fonts/Inter/Inter_18pt-ExtraLight.ttf",
            weight: "100",
            style: "normal",
        },
    ],
    variable: "--font-custom",
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});