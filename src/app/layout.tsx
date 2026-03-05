import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const notoSansArabic = Noto_Sans_Arabic({
    variable: "--font-noto-sans-ar",
    subsets: ["arabic"],
    weight: ["300", "400", "500", "600", "700"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
    variable: "--font-noto-naskh-ar",
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Souria Houria — Syrie Liberté",
    description:
        "Souria Houria œuvre pour la liberté, la dignité et les droits du peuple syrien.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" dir="ltr" data-theme="light" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${notoSansArabic.variable} ${notoNaskhArabic.variable}`}
            >
                <ThemeProvider>
                    <Header />
                    <Nav />
                    <main>{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
