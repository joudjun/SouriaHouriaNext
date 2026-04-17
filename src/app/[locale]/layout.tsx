import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { isValidLocale } from "@/libs/locale";
import { getSiteGlobal } from "@/libs/strapi";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";

interface Props {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const global = await getSiteGlobal();

    return (
        <ThemeProvider initialLocale={locale as Locale}>
            <Header />
            <Nav />
            <main>{children}</main>
            <Footer global={global} />
        </ThemeProvider>
    );
}
