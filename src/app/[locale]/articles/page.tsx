import type { Metadata } from "next";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { getArticles, getCategories, getActiveCategorySlugs } from "@/libs/strapi";
import { getImageUrl } from "@/libs/image";
import { formatDate, htmlExcerpt, localePath, t } from "@/libs/locale";
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
                ? "مقالات — سوريا حرية"
                : "Articles — Souria Houria",
    };
}

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function ArticlesPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;
    const sp = await searchParams;
    const page = Number(sp.page) || 1;
    const categorySlug = sp.category;

    const [articlesRes, categories, activeSlugs] = await Promise.all([
        getArticles(page, 9, loc, categorySlug),
        getCategories(loc),
        getActiveCategorySlugs(loc),
    ]);

    const articles = articlesRes.data;
    const pagination = articlesRes.meta.pagination!;
    const activeCategories = categories.filter((cat) => activeSlugs.has(cat.slug));

    return (
        <section className="section">
            <div className="container">
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        { label: t(loc, "articles") },
                    ]}
                />

                <h1 className="mb-6">{t(loc, "articles")}</h1>

                <div className="filter-bar mb-8">
                    <Link
                        href={localePath(loc, "/articles")}
                        className={`filter-btn${!categorySlug ? " active" : ""}`}
                    >
                        {t(loc, "all")}
                    </Link>
                    {activeCategories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={localePath(
                                loc,
                                `/articles?category=${cat.slug}`,
                            )}
                            className={`filter-btn${categorySlug === cat.slug ? " active" : ""}`}
                        >
                            {cat.name}
                        </Link>
                    ))}
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

                {articles.length === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "var(--neutral-400)",
                            padding: "var(--space-8) 0",
                        }}
                    >
                        {loc === "ar"
                            ? "لا توجد مقالات."
                            : "Aucun article trouvé."}
                    </p>
                )}

                {pagination.pageCount > 1 && (
                    <Pagination
                        page={page}
                        pageCount={pagination.pageCount}
                        locale={loc}
                        buildHref={(p) =>
                            localePath(
                                loc,
                                `/articles?page=${p}${categorySlug ? `&category=${categorySlug}` : ""}`,
                            )
                        }
                    />
                )}
            </div>
        </section>
    );
}
