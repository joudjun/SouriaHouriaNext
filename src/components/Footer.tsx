"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { localePath, t } from "@/libs/locale";

export default function Footer() {
    const { locale } = useTheme();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <h3>Souria Houria</h3>
                        <ul>
                            <li>
                                <Link href={localePath(locale, "/about")}>
                                    {t(locale, "about")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    {locale === "ar"
                                        ? "كن عضواً"
                                        : "Devenir membre"}
                                </Link>
                            </li>
                            <li>
                                <Link href={localePath(locale, "/contact")}>
                                    {t(locale, "contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>{locale === "ar" ? "وسائطنا" : "Nos médias"}</h3>
                        <ul>
                            <li>
                                <Link href={localePath(locale, "/articles")}>
                                    {t(locale, "articles")}
                                </Link>
                            </li>
                            <li>
                                <Link href={localePath(locale, "/events")}>
                                    {t(locale, "events")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={localePath(locale, "/press-releases")}
                                >
                                    {t(locale, "pressReleases")}
                                </Link>
                            </li>
                            <li>
                                <Link href={localePath(locale, "/galleries")}>
                                    {t(locale, "galleries")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Newsletter</h3>
                        <p
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "0.875rem",
                            }}
                        >
                            {locale === "ar"
                                ? "احصل على آخر أخبارنا."
                                : "Recevez nos dernières actualités."}
                        </p>
                        <form
                            className="newsletter-form"
                            action="#"
                            style={{ marginTop: "var(--space-4)" }}
                        >
                            <input type="email" placeholder="Email" />
                            <button type="submit">OK</button>
                        </form>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        © 2026 Souria Houria — Syrie Liberté.{" "}
                        {locale === "ar"
                            ? "جميع الحقوق محفوظة."
                            : "Tous droits réservés."}
                    </p>
                    <div className="footer-social">
                        <Link href="#">f</Link>
                        <Link href="#">𝕏</Link>
                        <Link href="#">▶</Link>
                        <Link href="#">◻</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
