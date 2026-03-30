import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getArticleBySlug, articleExistsInLocale } from "@/libs/strapi";
import { getImageUrl, getImageAlt, processContent } from "@/libs/image";
import { formatDate, localePath, t, defaultLocale } from "@/libs/locale";
import ShareButtons from "@/components/ShareButtons";
import type { Locale } from "@/types";

export const revalidate = 300;

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const article = await getArticleBySlug(slug, locale as Locale);
    if (!article) return { title: "Article introuvable" };
    return {
        title: `${article.title} — Souria Houria`,
        description: article.content?.replace(/<[^>]+>/g, "").slice(0, 160),
    };
}

export default async function ArticlePage({ params }: Props) {
    const { locale, slug } = await params;
    const loc = locale as Locale;

    const article = await getArticleBySlug(slug, loc);

    if (!article) {
        // If article exists in the other locale, redirect to homepage of this locale
        // (the user switched locale but article has no translation)
        if (loc !== defaultLocale) {
            const existsInDefault = await articleExistsInLocale(
                slug,
                defaultLocale,
            );
            if (existsInDefault) {
                redirect(localePath(loc, "/"));
            }
        }
        notFound();
    }

    const imageUrl = getImageUrl(article.featuredImage, article.content);

    return (
        <article className="section">
            <div className="container" style={{ maxWidth: 800 }}>
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        {
                            label: t(loc, "articles"),
                            href: localePath(loc, "/articles"),
                        },
                        { label: article.title },
                    ]}
                />

                {article.categories?.length > 0 && (
                    <span className="card-category">
                        {article.categories[0].name}
                    </span>
                )}

                <h1>{article.title}</h1>

                <div
                    className="article-meta"
                    style={{
                        color: "var(--neutral-400)",
                        marginBottom: "var(--space-6)",
                    }}
                >
                    {formatDate(article.createdAt, loc)}
                    {article.author && <> · {article.author.name}</>}
                    {article.sourceName && (
                        <>
                            {" · "}
                            {t(loc, "source")}
                            {" : "}
                            {article.sourceUrl ? (
                                <a
                                    href={article.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {article.sourceName}
                                </a>
                            ) : (
                                article.sourceName
                            )}
                        </>
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
                            alt={getImageAlt(
                                article.featuredImage,
                                article.title,
                            )}
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
                        __html: processContent(article.content),
                    }}
                />

                <ShareButtons title={article.title} label={t(loc, "share")} />
            </div>
        </article>
    );
}
