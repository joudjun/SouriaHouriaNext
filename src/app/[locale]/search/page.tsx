import type { Metadata } from "next";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { searchContent } from "@/libs/strapi";
import { getImageUrl } from "@/libs/image";
import { formatDate, htmlExcerpt, localePath, t } from "@/libs/locale";
import type { Locale } from "@/types";

export const revalidate = 0; // always fresh

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const sp = await searchParams;
    const q = sp.q ?? "";
    const label = locale === "ar" ? "نتائج البحث" : "Résultats de recherche";
    return {
        title: q
            ? `${label}: ${q} — Souria Houria`
            : `${label} — Souria Houria`,
    };
}

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;
    const sp = await searchParams;
    const q = sp.q?.trim() ?? "";

    const results =
        q.length >= 2
            ? await searchContent(q, loc, 20)
            : { articles: [], events: [], pressReleases: [] };

    const total =
        results.articles.length +
        results.events.length +
        results.pressReleases.length;

    return (
        <section className="section">
            <div className="container">
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        { label: t(loc, "searchResults") },
                    ]}
                />

                <h1 className="mb-6">
                    {t(loc, "searchResults")}
                    {q && (
                        <span
                            style={{
                                fontWeight: 400,
                                color: "var(--neutral-400)",
                            }}
                        >
                            {" "}
                            — &ldquo;{q}&rdquo;
                        </span>
                    )}
                </h1>

                {total === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "var(--neutral-400)",
                            padding: "var(--space-8) 0",
                        }}
                    >
                        {q.length < 2
                            ? loc === "ar"
                                ? "أدخل كلمة للبحث (حرفين على الأقل)."
                                : "Entrez un mot pour rechercher (2 caractères minimum)."
                            : t(loc, "noResults")}
                    </p>
                )}

                {results.pressReleases.length > 0 && (
                    <div style={{ marginBottom: "var(--space-8)" }}>
                        <h2 className="mb-4">{t(loc, "pressReleases")}</h2>
                        <div className="card-grid">
                            {results.pressReleases.map((pr) => (
                                <Card
                                    key={pr.id}
                                    href={localePath(
                                        loc,
                                        `/press-releases/${pr.slug}`,
                                    )}
                                    image={getImageUrl(
                                        pr.featuredImage,
                                        pr.content,
                                    )}
                                    category={t(loc, "pressReleases")}
                                    title={pr.title}
                                    excerpt={htmlExcerpt(pr.content)}
                                    date={formatDate(pr.createdAt, loc)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {results.events.length > 0 && (
                    <div style={{ marginBottom: "var(--space-8)" }}>
                        <h2 className="mb-4">{t(loc, "events")}</h2>
                        <div className="card-grid">
                            {results.events.map((e) => {
                                const start = e.dateStart
                                    ? new Date(e.dateStart)
                                    : null;
                                return (
                                    <Card
                                        key={e.id}
                                        href={localePath(
                                            loc,
                                            `/events/${e.slug}`,
                                        )}
                                        image={getImageUrl(
                                            e.featuredImage,
                                            e.content,
                                        )}
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
                                                      year: start.getFullYear() !== new Date().getFullYear()
                                                          ? String(start.getFullYear())
                                                          : undefined,
                                                  }
                                                : undefined
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {results.articles.length > 0 && (
                    <div style={{ marginBottom: "var(--space-8)" }}>
                        <h2 className="mb-4">{t(loc, "articles")}</h2>
                        <div className="card-grid">
                            {results.articles.map((a) => (
                                <Card
                                    key={a.id}
                                    href={localePath(
                                        loc,
                                        `/articles/${a.slug}`,
                                    )}
                                    image={getImageUrl(
                                        a.featuredImage,
                                        a.content,
                                    )}
                                    category={a.categories?.[0]?.name ?? ""}
                                    title={a.title}
                                    excerpt={htmlExcerpt(a.content)}
                                    date={formatDate(a.createdAt, loc)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
