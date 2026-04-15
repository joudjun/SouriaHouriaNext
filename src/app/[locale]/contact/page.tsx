import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { localePath, t } from "@/libs/locale";
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
                        <ContactForm locale={loc} />

                        {/* Contact info sidebar */}
                        <div className="contact-info-sidebar">
                            <div className="contact-info-item">
                                <div className="contact-info-icon">📧</div>
                                <div>
                                    <h4>
                                        {loc === "ar"
                                            ? "البريد الإلكتروني"
                                            : "Email"}
                                    </h4>
                                    <a href="mailto:contact@souriahouria.com">
                                        contact@souriahouria.com
                                    </a>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="contact-info-icon">📍</div>
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
                                <div className="contact-info-icon">📱</div>
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
                                        <a
                                            href="#"
                                            style={{
                                                color: "var(--secondary)",
                                            }}
                                        >
                                            Facebook
                                        </a>
                                        <a
                                            href="#"
                                            style={{
                                                color: "var(--secondary)",
                                            }}
                                        >
                                            Twitter
                                        </a>
                                        <a
                                            href="#"
                                            style={{
                                                color: "var(--secondary)",
                                            }}
                                        >
                                            YouTube
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="contact-info-icon">🕐</div>
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
