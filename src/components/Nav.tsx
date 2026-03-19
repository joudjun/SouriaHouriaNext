"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { localePath, t } from "@/libs/locale";
import type { Locale } from "@/types";

function navItems(locale: Locale) {
    return [
        { href: localePath(locale, "/"), label: t(locale, "home") },
        { href: localePath(locale, "/articles"), label: t(locale, "articles") },
        { href: localePath(locale, "/events"), label: t(locale, "events") },
        { href: localePath(locale, "/about"), label: t(locale, "about") },
        { href: localePath(locale, "/contact"), label: t(locale, "contact") },
    ];
}

export default function Nav() {
    const pathname = usePathname();
    const { locale } = useTheme();
    const [open, setOpen] = useState(false);
    const items = navItems(locale);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function isActive(href: string) {
        const localeHome = localePath(locale, "/");
        if (href === localeHome) return pathname === localeHome;
        return pathname.startsWith(href);
    }

    return (
        <nav className="nav">
            <div className="container">
                <button
                    className="nav-hamburger"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
                <ul className={`nav-list${open ? " open" : ""}`}>
                    {items.map((item) => (
                        <li
                            key={item.href}
                            className={`nav-item${isActive(item.href) ? " active" : ""}`}
                        >
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
