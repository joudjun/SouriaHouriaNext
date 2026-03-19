"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { alternateLocale, localePath, t } from "@/libs/locale";

export default function Header() {
    const { theme, locale, toggleTheme, switchLocale } = useTheme();

    return (
        <header className="header">
            <div className="container">
                <Link
                    href={localePath(locale, "/")}
                    className="header-logo"
                >
                    <Image
                        src="/SouriaHouria.svg"
                        alt="Souria Houria"
                        width={160}
                        height={40}
                        priority
                    />
                    <span className="header-logo-text">{locale === "ar" ? "سورية حرية" : "Souria Houria"}</span>
                </Link>
                <div className="header-actions">
                    <button className="toggle-btn" onClick={switchLocale}>
                        <span className="icon">🌐</span>{" "}
                        <span>
                            {alternateLocale(locale) === "ar" ? "عربي" : "FR"}
                        </span>
                    </button>
                    <button className="toggle-btn" onClick={toggleTheme}>
                        <span className="icon">
                            {theme === "light" ? "☀️" : "🌙"}
                        </span>
                    </button>
                    <Link
                        href={localePath(locale, "/contact")}
                        className="btn btn-white-outline btn-sm"
                    >
                        {t(locale, "donate")}
                    </Link>
                </div>
            </div>
        </header>
    );
}
