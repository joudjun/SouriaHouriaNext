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

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    locale: Locale;
    toggleTheme: () => void;
    switchLocale: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "system",
    resolvedTheme: "light",
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
            if (saved === "dark" || saved === "light" || saved === "system") return saved;
        }
        return "system";
    });
    const [systemPref, setSystemPref] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return "light";
    });
    const pathname = usePathname();
    const router = useRouter();
    const isFirstRender = useRef(true);

    const locale: Locale = initialLocale;
    const resolvedTheme: "light" | "dark" = theme === "system" ? systemPref : theme;

    // Listen for OS theme changes
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => setSystemPref(e.matches ? "dark" : "light");
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

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
        document.documentElement.setAttribute("data-theme", resolvedTheme);
        localStorage.setItem("sh-theme", theme);
    }, [theme, resolvedTheme]);

    // Keep <html> lang/dir in sync on client-side locale switches
    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = localeDir(locale);
    }, [locale]);

    const toggleTheme = useCallback(() => {
        setTheme((t) => {
            if (t === "light") return "dark";
            if (t === "dark") return "system";
            return "light";
        });
    }, []);

    const switchLocale = useCallback(() => {
        const target = alternateLocale(locale);
        const newPath = pathname.replace(/^\/(fr|ar)/, `/${target}`);
        router.push(newPath);
    }, [locale, pathname, router]);

    return (
        <ThemeContext.Provider
            value={{ theme, resolvedTheme, locale, toggleTheme, switchLocale }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
