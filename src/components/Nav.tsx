"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const NAV_FR = [
    { href: "/", label: "Accueil" },
    { href: "/articles", label: "Articles" },
    { href: "/events", label: "Évènements" },
    { href: "/about", label: "Qui sommes-nous" },
    { href: "/contact", label: "Contact" },
];

const NAV_AR = [
    { href: "/", label: "الرئيسية" },
    { href: "/articles", label: "مقالات" },
    { href: "/events", label: "فعاليات" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "اتصل بنا" },
];

export default function Nav() {
    const pathname = usePathname();
    const { lang } = useTheme();
    const [open, setOpen] = useState(false);
    const items = lang === "ar" ? NAV_AR : NAV_FR;

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
        if (href === "/") return pathname === "/";
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
