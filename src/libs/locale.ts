import type { Locale } from "@/types";

export const locales: Locale[] = ["fr", "ar"];
export const defaultLocale: Locale = "fr";

export function isValidLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

/** Resolve the "other" locale for the locale switcher. */
export function alternateLocale(current: Locale): Locale {
    return current === "fr" ? "ar" : "fr";
}

/** Map locale to HTML dir attribute. */
export function localeDir(locale: Locale): "ltr" | "rtl" {
    return locale === "ar" ? "rtl" : "ltr";
}

/** Common date formatting per locale. */
export function formatDate(
    dateStr: string,
    locale: Locale,
    options?: Intl.DateTimeFormatOptions,
): string {
    return new Date(dateStr).toLocaleDateString(
        locale === "ar" ? "ar-SY" : "fr-FR",
        options ?? { day: "numeric", month: "long", year: "numeric" },
    );
}

/** Extract excerpt from HTML content. */
export function htmlExcerpt(
    html: string | null | undefined,
    len = 140,
): string {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "").trim();
    if (text.length <= len) return text;
    return text.slice(0, len) + "…";
}

/** Build a locale-prefixed path. */
export function localePath(locale: Locale, path: string): string {
    return `/${locale}${path}`;
}

/** UI translations for common labels. */
const translations = {
    fr: {
        home: "Accueil",
        articles: "Articles",
        events: "Évènements",
        about: "Qui sommes-nous",
        contact: "Contact",
        donate: "Faire un don",
        seeAllArticles: "Voir tous les articles →",
        seeAllEvents: "Voir tous les évènements →",
        latestArticles: "Dernières publications",
        upcomingEvents: "Évènements à venir",
        whoAreWe: "Qui sommes-nous",
        supportUs: "Soutenez notre action",
        prev: "← Préc",
        next: "Suiv →",
        all: "Tous",
        upcoming: "À venir",
        past: "Passés",
        learnMore: "En savoir plus",
        notFound: "Page introuvable",
        notFoundMessage:
            "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
        backHome: "Retour à l'accueil",
        contactUs: "Contactez-nous",
        source: "Source",
        publishedOn: "Publié le",
    },
    ar: {
        home: "الرئيسية",
        articles: "مقالات",
        events: "فعاليات",
        about: "من نحن",
        contact: "اتصل بنا",
        donate: "تبرع",
        seeAllArticles: "عرض جميع المقالات ←",
        seeAllEvents: "عرض جميع الفعاليات ←",
        latestArticles: "آخر المنشورات",
        upcomingEvents: "الفعاليات القادمة",
        whoAreWe: "من نحن",
        supportUs: "ادعم عملنا",
        prev: "→ السابق",
        next: "التالي ←",
        all: "الكل",
        upcoming: "قادمة",
        past: "سابقة",
        learnMore: "اقرأ المزيد",
        notFound: "الصفحة غير موجودة",
        notFoundMessage: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
        backHome: "العودة للرئيسية",
        contactUs: "اتصل بنا",
        source: "المصدر",
        publishedOn: "نُشر في",
    },
} as const;

export type TranslationKey = keyof (typeof translations)["fr"];

export function t(locale: Locale, key: TranslationKey): string {
    return translations[locale][key];
}
