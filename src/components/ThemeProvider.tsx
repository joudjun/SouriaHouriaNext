"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";
type Lang = "fr" | "ar";

interface ThemeContextType {
    theme: Theme;
    lang: Lang;
    toggleTheme: () => void;
    toggleLang: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    lang: "fr",
    toggleTheme: () => {},
    toggleLang: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [lang, setLang] = useState<Lang>("fr");

    useEffect(() => {
        const savedTheme = localStorage.getItem("sh-theme") as Theme | null;
        const savedLang = localStorage.getItem("sh-lang") as Lang | null;
        if (savedTheme === "dark") setTheme("dark");
        if (savedLang === "ar") setLang("ar");
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("sh-theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute(
            "dir",
            lang === "ar" ? "rtl" : "ltr",
        );
        localStorage.setItem("sh-lang", lang);
    }, [lang]);

    const toggleTheme = useCallback(() => {
        setTheme((t) => (t === "light" ? "dark" : "light"));
    }, []);

    const toggleLang = useCallback(() => {
        setLang((l) => (l === "fr" ? "ar" : "fr"));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, lang, toggleTheme, toggleLang }}>
            {children}
        </ThemeContext.Provider>
    );
}
