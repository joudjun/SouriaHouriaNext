import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Noto_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import type { Locale } from "@/types";
import { localeDir } from "@/libs/locale";

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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const h = await headers();
    const locale = (h.get("x-locale") || "fr") as Locale;

    return (
        <html lang={locale} dir={localeDir(locale)} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem("sh-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);else document.documentElement.setAttribute("data-theme","light")}catch(e){document.documentElement.setAttribute("data-theme","light")}})()`,
                    }}
                />
            </head>
            <body
                className={`${inter.variable} ${notoSansArabic.variable} ${notoNaskhArabic.variable}`}
            >
                {children}
            </body>
        </html>
    );
}
