"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Header() {
    const { theme, lang, toggleTheme, toggleLang } = useTheme();

    return (
        <header className="header">
            <div className="container">
                <Link href="/" className="header-logo-text">
                    Souria Houria
                </Link>
                <div className="header-actions">
                    <button className="toggle-btn" onClick={toggleLang}>
                        <span className="icon">🌐</span>{" "}
                        <span>{lang === "fr" ? "FR" : "عر"}</span>
                    </button>
                    <button className="toggle-btn" onClick={toggleTheme}>
                        <span className="icon">
                            {theme === "light" ? "☀️" : "🌙"}
                        </span>
                    </button>
                    <Link href="#" className="btn btn-white-outline btn-sm">
                        {lang === "ar" ? "تبرع" : "Faire un don"}
                    </Link>
                </div>
            </div>
        </header>
    );
}
