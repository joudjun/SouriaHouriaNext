"use client";

import { useState } from "react";
import type { Locale } from "@/types";

interface Props {
    locale: Locale;
}

const subjects = {
    fr: [
        "Question générale",
        "Devenir membre",
        "Proposition de partenariat",
        "Presse / Médias",
        "Signaler un problème",
        "Autre",
    ],
    ar: [
        "سؤال عام",
        "الانضمام كعضو",
        "اقتراح شراكة",
        "صحافة / إعلام",
        "الإبلاغ عن مشكلة",
        "أخرى",
    ],
};

export default function ContactForm({ locale }: Props) {
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
            locale,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Submission failed");
            }

            setStatus("success");
            form.reset();
        } catch (err) {
            setStatus("error");
            setErrorMsg(
                err instanceof Error ? err.message : "Submission failed",
            );
        }
    }

    if (status === "success") {
        return (
            <div className="contact-form-wrapper">
                <div
                    style={{
                        padding: "var(--space-8)",
                        textAlign: "center",
                        color: "var(--success, #16a34a)",
                    }}
                >
                    <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                        {locale === "ar"
                            ? "تم إرسال رسالتك بنجاح!"
                            : "Votre message a été envoyé avec succès !"}
                    </p>
                    <p
                        style={{
                            marginTop: "var(--space-2)",
                            color: "var(--neutral-500)",
                        }}
                    >
                        {locale === "ar"
                            ? "سنرد عليك في أقرب وقت."
                            : "Nous vous répondrons dans les meilleurs délais."}
                    </p>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: "var(--space-4)" }}
                        onClick={() => setStatus("idle")}
                    >
                        {locale === "ar"
                            ? "إرسال رسالة أخرى"
                            : "Envoyer un autre message"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        {locale === "ar" ? "الاسم الكامل *" : "Nom complet *"}
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder={locale === "ar" ? "اسمك" : "Votre nom"}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        {locale === "ar"
                            ? "البريد الإلكتروني *"
                            : "Email *"}
                    </label>
                    <input
                        className="form-input"
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={
                            locale === "ar"
                                ? "بريدك@email.com"
                                : "votre@email.com"
                        }
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="subject">
                        {locale === "ar" ? "الموضوع *" : "Sujet *"}
                    </label>
                    <select
                        className="form-select"
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                    >
                        <option value="" disabled>
                            {locale === "ar"
                                ? "اختر موضوعاً"
                                : "Choisir un sujet"}
                        </option>
                        {subjects[locale].map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="message">
                        {locale === "ar" ? "الرسالة *" : "Message *"}
                    </label>
                    <textarea
                        className="form-textarea"
                        id="message"
                        name="message"
                        rows={6}
                        required
                        placeholder={
                            locale === "ar"
                                ? "رسالتك..."
                                : "Votre message..."
                        }
                    />
                </div>

                {status === "error" && (
                    <p
                        style={{
                            color: "var(--error, #dc2626)",
                            marginBottom: "var(--space-4)",
                        }}
                    >
                        {errorMsg ||
                            (locale === "ar"
                                ? "حدث خطأ. حاول مرة أخرى."
                                : "Une erreur est survenue. Veuillez réessayer.")}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === "submitting"}
                >
                    {status === "submitting"
                        ? locale === "ar"
                            ? "جارٍ الإرسال..."
                            : "Envoi en cours..."
                        : locale === "ar"
                          ? "إرسال الرسالة"
                          : "Envoyer le message"}
                </button>
            </form>
        </div>
    );
}
