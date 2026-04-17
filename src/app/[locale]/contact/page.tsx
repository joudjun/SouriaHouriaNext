import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { localePath, t } from "@/libs/locale";
import { getSiteGlobal } from "@/libs/strapi";
import type { Locale } from "@/types";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return {
        title:
            locale === "ar"
                ? "اتصل بنا — سوريا حرية"
                : "Contact — Souria Houria",
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;
    const global = await getSiteGlobal();

    const socialLabels: Record<string, string> = {
        facebook: "Facebook",
        x: "X",
        youtube: "YouTube",
        instagram: "Instagram",
    };
    const socials = (["facebook", "x", "youtube", "instagram"] as const).filter(
        (key) => global[key],
    );

    return (
        <>
            <section className="section">
                <div className="container">
                    <Breadcrumbs
                        items={[
                            {
                                label: t(loc, "home"),
                                href: localePath(loc, "/"),
                            },
                            { label: t(loc, "contact") },
                        ]}
                    />

                    <h1 className="mb-6">{t(loc, "contact")}</h1>
                    <p
                        style={{
                            color: "var(--neutral-500)",
                            maxWidth: 640,
                            marginBottom: "var(--space-8)",
                        }}
                    >
                        {loc === "ar"
                            ? "لديك سؤال أو اقتراح أو ترغب في التعاون معنا؟ لا تتردد في مراسلتنا. سنرد عليك في أقرب وقت."
                            : "Vous avez une question, une suggestion ou souhaitez collaborer avec nous ? N\u2019hésitez pas à nous écrire. Nous vous répondrons dans les meilleurs délais."}
                    </p>

                    <div className="contact-grid">
                        {/* Contact form */}
                        <Suspense>
                            <ContactForm locale={loc} />
                        </Suspense>

                        {/* Contact info sidebar */}
                        <div className="contact-info-sidebar">
                            <div className="contact-info-item">
                                <div className="contact-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                                <div>
                                    <h4>
                                        {loc === "ar"
                                            ? "البريد الإلكتروني"
                                            : "Email"}
                                    </h4>
                                    <a href={`mailto:${global.email}`}>
                                        {global.email}
                                    </a>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="contact-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                                <div>
                                    <h4>
                                        {loc === "ar" ? "العنوان" : "Adresse"}
                                    </h4>
                                    <p>
                                        Souria Houria
                                        <br />
                                        {loc === "ar"
                                            ? "باريس، فرنسا"
                                            : "Paris, France"}
                                    </p>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="contact-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></div>
                                <div>
                                    <h4>
                                        {loc === "ar"
                                            ? "التواصل الاجتماعي"
                                            : "Réseaux sociaux"}
                                    </h4>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "var(--space-3)",
                                            marginTop: "var(--space-2)",
                                        }}
                                    >
                                        {socials.map((key) => (
                                            <a
                                                key={key}
                                                href={global[key]!}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "var(--secondary)",
                                                }}
                                            >
                                                {socialLabels[key]}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="contact-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                                <div>
                                    <h4>
                                        {loc === "ar"
                                            ? "ساعات العمل"
                                            : "Horaires"}
                                    </h4>
                                    <p>
                                        {loc === "ar"
                                            ? "الإثنين — الجمعة"
                                            : "Lundi — Vendredi"}
                                        <br />
                                        10h00 — 18h00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="section section-alt">
                <div className="container">
                    <div
                        style={{
                            background: "var(--neutral-200)",
                            borderRadius: "var(--radius-lg)",
                            height: 320,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--neutral-400)",
                            fontSize: "1rem",
                        }}
                    >
                        {loc === "ar"
                            ? "خريطة تفاعلية — باريس، فرنسا"
                            : "Carte interactive — Paris, France"}
                    </div>
                </div>
            </section>
        </>
    );
}
