import type { Metadata } from "next";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { getEvents, EVENT_TYPES, isValidEventType } from "@/libs/strapi";
import type { EventTypeFilter } from "@/libs/strapi";
import { getImageUrl } from "@/libs/image";
import { htmlExcerpt, localePath, t, type TranslationKey } from "@/libs/locale";
import Link from "next/link";
import type { Locale } from "@/types";

export const revalidate = 60;

const eventTypeLabel: Record<EventTypeFilter, TranslationKey> = {
    souriahouria: "eventTypeSouriahouria",
    sundays: "eventTypeSundays",
    apricot: "eventTypeApricot",
    speeches: "eventTypeSpeeches",
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {
        title:
            locale === "ar"
                ? "فعاليات — سوريا حرية"
                : "Évènements — Souria Houria",
    };
}

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        page?: string;
        upcoming?: string;
        type?: string;
    }>;
}

export default async function EventsPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;
    const sp = await searchParams;
    const page = Number(sp.page) || 1;
    const upcoming =
        sp.upcoming === "1" ? true : sp.upcoming === "0" ? false : undefined;
    const eventType = sp.type && isValidEventType(sp.type) ? sp.type : undefined;

    const eventsRes = await getEvents(page, 9, loc, upcoming, eventType);
    const events = eventsRes.data;
    const pagination = eventsRes.meta.pagination!;

    function buildHref(params: Record<string, string>) {
        const qs = new URLSearchParams(params).toString();
        return localePath(loc, `/events${qs ? `?${qs}` : ""}`);
    }

    /** Preserve current filters when changing one param. */
    function filterHref(overrides: Record<string, string | undefined>) {
        const merged: Record<string, string> = {};
        if (upcoming !== undefined) merged.upcoming = upcoming ? "1" : "0";
        if (eventType) merged.type = eventType;
        for (const [k, v] of Object.entries(overrides)) {
            if (v === undefined) delete merged[k];
            else merged[k] = v;
        }
        // Reset to page 1 when changing filters
        delete merged.page;
        return buildHref(merged);
    }

    return (
        <section className="section">
            <div className="container">
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        { label: t(loc, "events") },
                    ]}
                />

                <h1 className="mb-6">{t(loc, "events")}</h1>

                {/* Event type filter */}
                <p className="filter-label">
                    {loc === "ar" ? "نوع الفعالية" : "Type d'évènement"}
                </p>
                <div className="filter-bar">
                    <Link
                        href={filterHref({ type: undefined })}
                        className={`filter-btn${!eventType ? " active" : ""}`}
                    >
                        {t(loc, "all")}
                    </Link>
                    {EVENT_TYPES.map((et) => (
                        <Link
                            key={et}
                            href={filterHref({ type: et })}
                            className={`filter-btn${eventType === et ? " active" : ""}`}
                        >
                            {t(loc, eventTypeLabel[et])}
                        </Link>
                    ))}
                </div>

                {/* Time filter */}
                <p className="filter-label">
                    {loc === "ar" ? "الفترة" : "Période"}
                </p>
                <div className="filter-bar mb-8">
                    <Link
                        href={filterHref({ upcoming: undefined })}
                        className={`filter-btn${upcoming === undefined ? " active" : ""}`}
                    >
                        {t(loc, "all")}
                    </Link>
                    <Link
                        href={filterHref({ upcoming: "1" })}
                        className={`filter-btn${upcoming === true ? " active" : ""}`}
                    >
                        {t(loc, "upcoming")}
                    </Link>
                    <Link
                        href={filterHref({ upcoming: "0" })}
                        className={`filter-btn${upcoming === false ? " active" : ""}`}
                    >
                        {t(loc, "past")}
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
                                image={getImageUrl(e.featuredImage, e.content)}
                                category={e.eventType && eventTypeLabel[e.eventType as EventTypeFilter] ? t(loc, eventTypeLabel[e.eventType as EventTypeFilter]) : ""}
                                title={e.title}
                                excerpt={htmlExcerpt(e.content)}
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

                {events.length === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "var(--neutral-400)",
                            padding: "var(--space-8) 0",
                        }}
                    >
                        {loc === "ar"
                            ? "لا توجد فعاليات."
                            : "Aucun évènement trouvé."}
                    </p>
                )}

                {pagination.pageCount > 1 && (
                    <Pagination
                        page={page}
                        pageCount={pagination.pageCount}
                        locale={loc}
                        buildHref={(p) => {
                            const params: Record<string, string> = {
                                page: String(p),
                            };
                            if (upcoming !== undefined)
                                params.upcoming = upcoming ? "1" : "0";
                            if (eventType) params.type = eventType;
                            return buildHref(params);
                        }}
                    />
                )}
            </div>
        </section>
    );
}
