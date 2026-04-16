"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { localePath, t } from "@/libs/locale";

export default function Footer() {
    const { locale } = useTheme();
    const [nlStatus, setNlStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [nlError, setNlError] = useState("");

    async function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setNlStatus("submitting");
        setNlError("");

        const form = e.currentTarget;
        const email = new FormData(form).get("email");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, locale }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed");
            }

            setNlStatus("success");
            form.reset();
        } catch (err) {
            setNlStatus("error");
            setNlError(
                err instanceof Error ? err.message : "Failed to subscribe",
            );
        }
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <h3>{locale === "ar" ? "سوريا حرية" : "Souria Houria"}</h3>
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
                        <h3>{locale === "ar" ? "النشرة الإخبارية" : "Newsletter"}</h3>
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
                        {nlStatus === "success" ? (
                            <p
                                style={{
                                    marginTop: "var(--space-4)",
                                    color: "#4ade80",
                                    fontSize: "0.875rem",
                                }}
                            >
                                {locale === "ar"
                                    ? "تم الاشتراك بنجاح!"
                                    : "Inscription réussie !"}
                            </p>
                        ) : (
                            <form
                                className="newsletter-form"
                                onSubmit={handleNewsletter}
                                style={{ marginTop: "var(--space-4)" }}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={locale === "ar" ? "البريد الإلكتروني" : "Email"}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={nlStatus === "submitting"}
                                >
                                    {nlStatus === "submitting" ? "..." : locale === "ar" ? "إرسال" : "OK"}
                                </button>
                            </form>
                        )}
                        {nlStatus === "error" && (
                            <p
                                style={{
                                    marginTop: "var(--space-2)",
                                    color: "#f87171",
                                    fontSize: "0.75rem",
                                }}
                            >
                                {nlError ||
                                    (locale === "ar"
                                        ? "حدث خطأ"
                                        : "Une erreur est survenue")}
                            </p>
                        )}
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        {locale === "ar"
                            ? "© 2026 سوريا حرية. جميع الحقوق محفوظة."
                            : "© 2026 Souria Houria — Syrie Liberté. Tous droits réservés."}
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
