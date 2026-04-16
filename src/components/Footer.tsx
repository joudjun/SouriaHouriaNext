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
                        <Link href="#" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </Link>
                        <Link href="#" aria-label="X">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </Link>
                        <Link href="#" aria-label="YouTube">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.56 31.56 0 0 0 0 12a31.56 31.56 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.56 31.56 0 0 0 24 12a31.56 31.56 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12z"/></svg>
                        </Link>
                        <Link href="#" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
