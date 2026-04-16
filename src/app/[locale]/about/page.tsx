import type { Metadata } from "next";
import Link from "next/link";
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
                ? "من نحن — سوريا حرية"
                : "Qui sommes-nous — Souria Houria",
    };
}

const team = [
    { name: "Mazen Adi", role: { fr: "Président", ar: "الرئيس" } },
    {
        name: "Nadia Khoury",
        role: { fr: "Vice-présidente", ar: "نائبة الرئيس" },
    },
    {
        name: "Omar Darwish",
        role: { fr: "Secrétaire général", ar: "الأمين العام" },
    },
    { name: "Layla Hasan", role: { fr: "Trésorière", ar: "أمينة الصندوق" } },
    {
        name: "Sami Barakat",
        role: { fr: "Responsable communication", ar: "مسؤول الاتصال" },
    },
    {
        name: "Rima Saleh",
        role: { fr: "Responsable événements", ar: "مسؤولة الفعاليات" },
    },
];

const missionIcons = [
    // Shield — rights defense
    <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    // Hands — refugee support
    <svg key="hands" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    // Megaphone — advocacy
    <svg key="mega" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
    // Palette — culture & memory
    <svg key="palette" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.7 1.7-1.5 0-.4-.2-.7-.4-1-.2-.3-.3-.7-.3-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9-10-9z"/></svg>,
];

const missions = {
    fr: [
        {
            title: "Défense des droits",
            text: "Nous défendons les droits fondamentaux du peuple syrien et documentons les violations des droits humains en Syrie depuis 2011.",
        },
        {
            title: "Soutien aux réfugiés",
            text: "Nous accompagnons les réfugiés syriens en France dans leurs démarches administratives, juridiques et d'intégration sociale.",
        },
        {
            title: "Plaidoyer international",
            text: "Nous portons la voix de la société civile syrienne auprès des institutions européennes et internationales.",
        },
        {
            title: "Culture et mémoire",
            text: "Nous organisons des événements culturels pour faire vivre la culture syrienne et préserver la mémoire collective.",
        },
    ],
    ar: [
        {
            title: "الدفاع عن الحقوق",
            text: "ندافع عن الحقوق الأساسية للشعب السوري ونوثق انتهاكات حقوق الإنسان في سوريا منذ 2011.",
        },
        {
            title: "دعم اللاجئين",
            text: "نرافق اللاجئين السوريين في فرنسا في إجراءاتهم الإدارية والقانونية والاندماج الاجتماعي.",
        },
        {
            title: "المناصرة الدولية",
            text: "نحمل صوت المجتمع المدني السوري لدى المؤسسات الأوروبية والدولية.",
        },
        {
            title: "الثقافة والذاكرة",
            text: "ننظم فعاليات ثقافية لإحياء الثقافة السورية والحفاظ على الذاكرة الجماعية.",
        },
    ],
};

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;

    return (
        <>
            {/* Hero banner */}
            <section
                className="hero"
                style={{
                    minHeight: 340,
                    backgroundImage:
                        "linear-gradient(rgba(27,58,92,0.7), rgba(27,58,92,0.85)), url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&h=500&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="container"
                    style={{ position: "relative", zIndex: 1 }}
                >
                    <div
                        className="breadcrumbs"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                        <Link
                            href={localePath(loc, "/")}
                            style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                            {t(loc, "home")}
                        </Link>
                        <span
                            className="separator"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                            ›
                        </span>
                        <span style={{ color: "#fff" }}>{t(loc, "about")}</span>
                    </div>
                    <h1 style={{ color: "#fff", marginTop: "var(--space-4)" }}>
                        {t(loc, "about")}
                    </h1>
                    <p
                        style={{
                            color: "rgba(255,255,255,0.85)",
                            fontSize: "1.125rem",
                            maxWidth: 640,
                            marginTop: "var(--space-3)",
                        }}
                    >
                        {loc === "ar"
                            ? "سوريا حرية تعمل من أجل الدفاع عن حقوق الشعب السوري ودعم المجتمع المدني."
                            : "Souria Houria — Syrie Liberté — œuvre pour la défense des droits du peuple syrien et le soutien de la société civile."}
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="section">
                <div className="container">
                    <h2 className="section-header">
                        {loc === "ar" ? "مهمتنا" : "Notre mission"}
                    </h2>
                    <div className="about-mission-grid">
                        {missions[loc].map((m, i) => (
                            <div key={i} className="about-mission-card">
                                <div className="about-mission-icon">
                                    {missionIcons[i]}
                                </div>
                                <h3>{m.title}</h3>
                                <p>{m.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* President quote */}
            <section className="section section-alt">
                <div className="container">
                    <div className="president-quote">
                        <div className="president-photo">
                            <div
                                style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: "50%",
                                    background: "var(--neutral-200)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "4rem",
                                    color: "var(--neutral-400)",
                                }}
                            >
                                👤
                            </div>
                        </div>
                        <div className="president-text">
                            <blockquote>
                                <p>
                                    {loc === "ar"
                                        ? "«سوريا حرية وُلدت من ضرورة التحرك إزاء المأساة السورية. منذ أكثر من عشر سنوات، نحمل صوت شعب يتطلع إلى الحرية والكرامة. نضالنا هو نضال العدالة والحقيقة والتضامن.»"
                                        : "« Souria Houria est née de l\u2019urgence d\u2019agir face à la tragédie syrienne. Depuis plus de dix ans, nous portons la voix d\u2019un peuple qui aspire à la liberté et à la dignité. Notre combat est celui de la justice, de la vérité et de la solidarité. »"}
                                </p>
                            </blockquote>
                            <div className="president-name">
                                <strong>Mazen Adi</strong>
                                <span>
                                    {loc === "ar"
                                        ? "رئيس سوريا حرية"
                                        : "Président de Souria Houria"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="section">
                <div className="container" style={{ maxWidth: 820 }}>
                    <h2 className="section-header">
                        {loc === "ar" ? "تاريخنا" : "Notre histoire"}
                    </h2>
                    <div className="article-body">
                        {loc === "ar" ? (
                            <>
                                <p>
                                    تأسست جمعية سوريا حرية عام 2011 استجابةً
                                    للانتفاضة الشعبية السورية. منذ الأيام الأولى
                                    للثورة، حشدت مجموعة من السوريين وأصدقاء
                                    سوريا المقيمين في فرنسا لدعم التطلعات
                                    الديمقراطية للشعب السوري.
                                </p>
                                <p>
                                    على مر السنين، وسعت الجمعية مجال عملها: من
                                    المساعدة الإنسانية الطارئة إلى دعم اللاجئين،
                                    ومن المناصرة السياسية إلى العمل الثقافي.
                                    اليوم، تُعد سوريا حرية صوتاً معترفاً به
                                    للمجتمع المدني السوري في فرنسا وأوروبا.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    Fondée en 2011, l&apos;association Souria
                                    Houria — «&nbsp;Syrie Liberté&nbsp;» en
                                    arabe — a été créée en réponse au
                                    soulèvement populaire syrien. Dès les
                                    premiers jours de la révolution, un groupe
                                    de Syriens et d&apos;amis de la Syrie vivant
                                    en France s&apos;est mobilisé pour soutenir
                                    les aspirations démocratiques du peuple
                                    syrien.
                                </p>
                                <p>
                                    Au fil des années, l&apos;association a
                                    élargi son champ d&apos;action&nbsp;: de
                                    l&apos;aide humanitaire d&apos;urgence au
                                    soutien aux réfugiés, du plaidoyer politique
                                    à l&apos;action culturelle.
                                    Aujourd&apos;hui, Souria Houria est une voix
                                    reconnue de la société civile syrienne en
                                    France et en Europe.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section section-alt">
                <div className="container">
                    <h2 className="section-header">
                        {loc === "ar" ? "فريقنا" : "Notre équipe"}
                    </h2>
                    <div className="team-grid">
                        {team.map((member, i) => (
                            <div key={i} className="team-member">
                                <div
                                    className="team-photo"
                                    style={{
                                        background: "var(--neutral-200)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "2.5rem",
                                        color: "var(--neutral-400)",
                                    }}
                                >
                                    👤
                                </div>
                                <h4>{member.name}</h4>
                                <span>{member.role[loc]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section className="section">
                <div className="container">
                    <h2 className="section-header">
                        {loc === "ar" ? "شركاؤنا" : "Nos partenaires"}
                    </h2>
                    <div className="partner-logos">
                        {Array.from({ length: 6 }, (_, i) => (
                            <div key={i} className="partner-logo">
                                <div
                                    style={{
                                        width: 120,
                                        height: 70,
                                        background: "var(--neutral-100)",
                                        borderRadius: "var(--radius-md)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--neutral-400)",
                                        fontSize: "0.75rem",
                                        textAlign: "center",
                                        padding: "var(--space-2)",
                                    }}
                                >
                                    {loc === "ar"
                                        ? `شريك ${i + 1}`
                                        : `Partenaire ${i + 1}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-band">
                <div className="container" style={{ textAlign: "center" }}>
                    <h2>{loc === "ar" ? "انضموا إلينا" : "Rejoignez-nous"}</h2>
                    <p
                        style={{
                            maxWidth: 600,
                            margin: "var(--space-3) auto var(--space-6)",
                            opacity: 0.9,
                        }}
                    >
                        {loc === "ar"
                            ? "ادعموا عملنا بأن تصبحوا أعضاء أو بالتبرع."
                            : "Soutenez notre action en devenant membre ou en faisant un don."}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "var(--space-4)",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link href="#" className="btn btn-white-outline">
                            {loc === "ar" ? "كن عضواً" : "Devenir membre"}
                        </Link>
                        <Link
                            href="#"
                            className="btn"
                            style={{
                                background: "#fff",
                                color: "var(--primary)",
                            }}
                        >
                            {t(loc, "donate")}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
