import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

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
        <html suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){var d=document.documentElement;try{var t=localStorage.getItem("sh-theme");if(t==="dark"||t==="light"){d.setAttribute("data-theme",t)}else{var m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.setAttribute("data-theme",m)}}catch(e){d.setAttribute("data-theme","light")}var l=location.pathname.match(/^\\/(fr|ar)/);if(l){d.lang=l[1];d.dir=l[1]==="ar"?"rtl":"ltr"}})()`,
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
