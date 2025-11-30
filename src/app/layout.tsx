import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
    title: "AudioProHome | Professional Home Studio Equipment Reviews",
    description: "Discover the best audio interfaces, studio monitors, and headphones for your home studio. Expert reviews and guides.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;

    return (
        <html>
            <body className={`${inter.variable} ${outfit.variable}`}>
                {gaId && <GoogleAnalytics gaId={gaId} />}
                {children}
            </body>
        </html>
    );
}
