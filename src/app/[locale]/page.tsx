import Link from "next/link";
import Card from "@/components/Card";
import { getArticles, getEvents, type EventTypeFilter } from "@/libs/strapi";
import { getImageUrl } from "@/libs/image";
import { formatDate, htmlExcerpt, localePath, t, type TranslationKey } from "@/libs/locale";
import type { Locale } from "@/types";

const eventTypeLabel: Record<EventTypeFilter, TranslationKey> = {
    souriahouria: "eventTypeSouriahouria",
    sundays: "eventTypeSundays",
    apricot: "eventTypeApricot",
    speeches: "eventTypeSpeeches",
};

export const revalidate = 60;

interface Props {
    params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;

    const [articlesRes, upcomingRes, recentRes] = await Promise.all([
        getArticles(1, 6, loc),
        getEvents(1, 3, loc, true),
        getEvents(1, 3, loc),
    ]);

    const articles = articlesRes.data;
    const upcomingIds = new Set(upcomingRes.data.map((e) => e.id));
    // Show upcoming first, fill remaining slots with recent
    const events = upcomingRes.data.length > 0
        ? [
              ...upcomingRes.data,
              ...recentRes.data.filter((e) => !upcomingIds.has(e.id)),
          ].slice(0, 3)
        : recentRes.data;

    return (
        <>
            {/* Hero */}
            <section
                className="hero"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1440&h=480&fit=crop')",
                }}
            >
                <div className="hero-content">
                    <h1>
                        {loc === "ar"
                            ? "دائماً إلى جانب الشعب السوري"
                            : "Toujours aux côtés du peuple syrien"}
                    </h1>
                    <p>
                        {loc === "ar"
                            ? "سوريا حرية تعمل من أجل الحرية والكرامة وحقوق الشعب السوري منذ 2011."
                            : "Souria Houria œuvre pour la liberté, la dignité et les droits du peuple syrien depuis 2011."}
                    </p>
                    <Link
                        href={localePath(loc, "/articles")}
                        className="btn btn-white-outline"
                    >
                        {loc === "ar"
                            ? "اكتشف أعمالنا"
                            : "Découvrir nos actions"}
                    </Link>
                </div>
            </section>

            {/* Évènements */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>{t(loc, "latestEvents")}</h2>
                        <Link
                            href={localePath(loc, "/events")}
                            className="see-all"
                        >
                            {t(loc, "seeAllEvents")}
                        </Link>
                    </div>
                    <div className="card-grid">
                        {events.map((e) => {
                            const start = e.dateStart
                                ? new Date(e.dateStart)
                                : null;
                            return (
                                <Card
                                    key={e.id}
                                    href={localePath(loc, `/events/${e.slug}`)}
                                    image={getImageUrl(
                                        e.featuredImage,
                                        e.content,
                                    )}
                                    category={e.eventType && eventTypeLabel[e.eventType as EventTypeFilter] ? t(loc, eventTypeLabel[e.eventType as EventTypeFilter]) : ""}
                                    title={e.title}
                                    excerpt={htmlExcerpt(e.content)}
                                    badge={upcomingIds.has(e.id) ? (loc === "ar" ? "قادم" : "À venir") : undefined}
                                    dateBadge={
                                        start
                                            ? {
                                                  day: String(
                                                      start.getDate(),
                                                  ).padStart(2, "0"),
                                                  month: start.toLocaleDateString(
                                                      loc === "ar"
                                                          ? "ar-SY"
                                                          : "fr-FR",
                                                      { month: "short" },
                                                  ),
                                              }
                                            : undefined
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Dernières publications */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <h2>{t(loc, "latestArticles")}</h2>
                        <Link
                            href={localePath(loc, "/articles")}
                            className="see-all"
                        >
                            {t(loc, "seeAllArticles")}
                        </Link>
                    </div>
                    <div className="card-grid">
                        {articles.map((a) => (
                            <Card
                                key={a.id}
                                href={localePath(loc, `/articles/${a.slug}`)}
                                image={getImageUrl(a.featuredImage, a.content)}
                                category={a.categories?.[0]?.name ?? ""}
                                title={a.title}
                                excerpt={htmlExcerpt(a.content)}
                                date={formatDate(a.createdAt, loc)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* About preview */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>{t(loc, "whoAreWe")}</h2>
                    </div>
                    <p style={{ maxWidth: 720 }}>
                        {loc === "ar"
                            ? "سوريا حرية — هي جمعية فرنسية تأسست عام 2011 للدفاع عن حقوق الشعب السوري ودعم اللاجئين وتعزيز الثقافة السورية."
                            : "Souria Houria — « Syrie Liberté » — est une association française fondée en 2011 pour défendre les droits du peuple syrien, soutenir les réfugiés et promouvoir la culture syrienne."}
                    </p>
                    <Link
                        href={localePath(loc, "/about")}
                        className="btn btn-outline"
                        style={{ marginTop: "var(--space-5)" }}
                    >
                        {t(loc, "learnMore")}
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-band">
                <div className="container" style={{ textAlign: "center" }}>
                    <h2>{t(loc, "supportUs")}</h2>
                    <p
                        style={{
                            maxWidth: 600,
                            margin: "var(--space-3) auto var(--space-6)",
                            opacity: 0.9,
                        }}
                    >
                        {loc === "ar"
                            ? "كل تبرع مهم. ساعدونا في مواصلة مهمتنا مع الشعب السوري."
                            : "Chaque don compte. Aidez-nous à poursuivre notre mission auprès du peuple syrien."}
                    </p>
                    <Link
                        href={localePath(loc, "/contact")}
                        className="btn btn-white-outline"
                    >
                        {t(loc, "donate")}
                    </Link>
                </div>
            </section>
        </>
    );
}
