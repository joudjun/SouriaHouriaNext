"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
    type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/types";
import { alternateLocale, localeDir } from "@/libs/locale";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    locale: Locale;
    toggleTheme: () => void;
    switchLocale: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    locale: "fr",
    toggleTheme: () => {},
    switchLocale: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({
    children,
    initialLocale = "fr",
}: {
    children: ReactNode;
    initialLocale?: Locale;
}) {
    // Lazy init: on client remount (locale switch) reads localStorage directly
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("sh-theme") as Theme | null;
            if (saved === "dark" || saved === "light") return saved;
        }
        return "light";
    });
    const pathname = usePathname();
    const router = useRouter();
    const isFirstRender = useRef(true);

    const locale: Locale = initialLocale;

    // On mount (including hydration), sync state from localStorage
    // without writing data-theme (blocking script in <head> handles that)
    useEffect(() => {
        const saved = localStorage.getItem("sh-theme") as Theme | null;
        if (saved && saved !== theme) {
            setTheme(saved);
        }
        isFirstRender.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync data-theme to DOM on theme changes, but skip the first
    // render (blocking <script> in <head> already set it correctly)
    useEffect(() => {
        if (isFirstRender.current) return;
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("sh-theme", theme);
    }, [theme]);

    // Keep <html> lang/dir in sync on client-side locale switches
    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = localeDir(locale);
    }, [locale]);

    const toggleTheme = useCallback(() => {
        setTheme((t) => (t === "light" ? "dark" : "light"));
    }, []);

    const switchLocale = useCallback(() => {
        const target = alternateLocale(locale);
        const newPath = pathname.replace(/^\/(fr|ar)/, `/${target}`);
        router.push(newPath);
    }, [locale, pathname, router]);

    return (
        <ThemeContext.Provider
            value={{ theme, locale, toggleTheme, switchLocale }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
