import type { Metadata } from "next";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getEvents } from "@/libs/strapi";
import { getImageUrl } from "@/libs/image";
import { htmlExcerpt, localePath, t } from "@/libs/locale";
import Link from "next/link";
import type { Locale } from "@/types";

export const revalidate = 60;

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
    searchParams: Promise<{ page?: string; upcoming?: string }>;
}

export default async function EventsPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;
    const sp = await searchParams;
    const page = Number(sp.page) || 1;
    // Default to showing all events (no upcoming filter) unless explicitly set
    const upcoming =
        sp.upcoming === "1" ? true : sp.upcoming === "0" ? false : undefined;

    const eventsRes = await getEvents(page, 9, loc, upcoming);
    const events = eventsRes.data;
    const pagination = eventsRes.meta.pagination!;

    function buildHref(params: Record<string, string>) {
        const qs = new URLSearchParams(params).toString();
        return localePath(loc, `/events${qs ? `?${qs}` : ""}`);
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

                <div className="filter-bar mb-8">
                    <Link
                        href={buildHref({})}
                        className={`filter-btn${upcoming === undefined ? " active" : ""}`}
                    >
                        {t(loc, "all")}
                    </Link>
                    <Link
                        href={buildHref({ upcoming: "1" })}
                        className={`filter-btn${upcoming === true ? " active" : ""}`}
                    >
                        {t(loc, "upcoming")}
                    </Link>
                    <Link
                        href={buildHref({ upcoming: "0" })}
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
                                category={e.categories?.[0]?.name ?? ""}
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
                    <div className="pagination">
                        {page > 1 && (
                            <Link
                                href={buildHref({
                                    page: String(page - 1),
                                    ...(upcoming !== undefined
                                        ? { upcoming: upcoming ? "1" : "0" }
                                        : {}),
                                })}
                                className="prev"
                            >
                                {t(loc, "prev")}
                            </Link>
                        )}
                        {Array.from(
                            { length: pagination.pageCount },
                            (_, i) => i + 1,
                        ).map((p) => (
                            <Link
                                key={p}
                                href={buildHref({
                                    page: String(p),
                                    ...(upcoming !== undefined
                                        ? { upcoming: upcoming ? "1" : "0" }
                                        : {}),
                                })}
                                className={p === page ? "active" : ""}
                            >
                                {p}
                            </Link>
                        ))}
                        {page < pagination.pageCount && (
                            <Link
                                href={buildHref({
                                    page: String(page + 1),
                                    ...(upcoming !== undefined
                                        ? { upcoming: upcoming ? "1" : "0" }
                                        : {}),
                                })}
                                className="next"
                            >
                                {t(loc, "next")}
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
