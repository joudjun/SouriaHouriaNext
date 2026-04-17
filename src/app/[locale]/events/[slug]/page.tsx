import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getEventBySlug, eventExistsInLocale, type EventTypeFilter } from "@/libs/strapi";
import { getImageUrl, getImageAlt, processContent } from "@/libs/image";
import { formatDate, localePath, t, defaultLocale, type TranslationKey } from "@/libs/locale";
import ShareButtons from "@/components/ShareButtons";
import type { Locale } from "@/types";

const eventTypeLabel: Record<EventTypeFilter, TranslationKey> = {
    souriahouria: "eventTypeSouriahouria",
    sundays: "eventTypeSundays",
    apricot: "eventTypeApricot",
    speeches: "eventTypeSpeeches",
};

export const revalidate = 300;

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const event = await getEventBySlug(slug, locale as Locale);
    if (!event) return { title: "Évènement introuvable" };
    return {
        title: `${event.title} — Souria Houria`,
        description: event.content?.replace(/<[^>]+>/g, "").slice(0, 160),
    };
}

export default async function EventPage({ params }: Props) {
    const { locale, slug } = await params;
    const loc = locale as Locale;

    const event = await getEventBySlug(slug, loc);

    if (!event) {
        // If event exists in default locale, redirect to this locale's homepage
        if (loc !== defaultLocale) {
            const existsInDefault = await eventExistsInLocale(
                slug,
                defaultLocale,
            );
            if (existsInDefault) {
                redirect(localePath(loc, "/"));
            }
        }
        notFound();
    }

    const imageUrl = getImageUrl(event.featuredImage, event.content);
    const start = event.dateStart ? new Date(event.dateStart) : null;
    const end = event.dateEnd ? new Date(event.dateEnd) : null;

    return (
        <article className="section">
            <div className="container" style={{ maxWidth: 1000 }}>
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        {
                            label: t(loc, "events"),
                            href: localePath(loc, "/events"),
                        },
                        { label: event.title },
                    ]}
                />

                {event.eventType && eventTypeLabel[event.eventType as EventTypeFilter] && (
                    <span className="card-category">
                        {t(loc, eventTypeLabel[event.eventType as EventTypeFilter])}
                    </span>
                )}

                <h1>{event.title}</h1>

                <div
                    className="article-meta"
                    style={{
                        color: "var(--neutral-400)",
                        marginBottom: "var(--space-6)",
                        display: "flex",
                        gap: "var(--space-4)",
                        flexWrap: "wrap",
                    }}
                >
                    {start && (
                        <span>
                            📅 {formatDate(event.dateStart!, loc)}
                            {end &&
                                end.getTime() !== start.getTime() &&
                                ` — ${formatDate(event.dateEnd!, loc)}`}
                        </span>
                    )}
                    {event.sourceName && (
                        <span>
                            {t(loc, "source")}
                            {" : "}
                            {event.sourceUrl ? (
                                <a
                                    href={event.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {event.sourceName}
                                </a>
                            ) : (
                                event.sourceName
                            )}
                        </span>
                    )}
                </div>

                {imageUrl !== "/SouriaHouria.svg" && (
                    <div
                        style={{
                            borderRadius: "var(--radius-lg)",
                            overflow: "hidden",
                            marginBottom: "var(--space-8)",
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={getImageAlt(event.featuredImage, event.title)}
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                            }}
                        />
                    </div>
                )}

                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                        __html: processContent(event.content),
                    }}
                />

                <ShareButtons title={event.title} label={t(loc, "share")} />
            </div>
        </article>
    );
}
