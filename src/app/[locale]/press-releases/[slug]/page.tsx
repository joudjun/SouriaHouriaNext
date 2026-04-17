import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
    getPressReleaseBySlug,
    pressReleaseExistsInLocale,
} from "@/libs/strapi";
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
    const pr = await getPressReleaseBySlug(slug, locale as Locale);
    if (!pr) return { title: "Communiqué introuvable" };
    return {
        title: `${pr.title} — Souria Houria`,
        description: pr.content?.replace(/<[^>]+>/g, "").slice(0, 160),
    };
}

export default async function PressReleasePage({ params }: Props) {
    const { locale, slug } = await params;
    const loc = locale as Locale;

    const pr = await getPressReleaseBySlug(slug, loc);

    if (!pr) {
        if (loc !== defaultLocale) {
            const existsInDefault = await pressReleaseExistsInLocale(
                slug,
                defaultLocale,
            );
            if (existsInDefault) {
                redirect(localePath(loc, "/"));
            }
        }
        notFound();
    }

    const imageUrl = getImageUrl(pr.featuredImage, pr.content);

    return (
        <article className="section">
            <div className="container" style={{ maxWidth: 1000 }}>
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        {
                            label: t(loc, "pressReleases"),
                            href: localePath(loc, "/press-releases"),
                        },
                        { label: pr.title },
                    ]}
                />

                <span className="card-category">{t(loc, "pressReleases")}</span>

                <h1>{pr.title}</h1>

                <div
                    className="article-meta"
                    style={{
                        color: "var(--neutral-400)",
                        marginBottom: "var(--space-6)",
                    }}
                >
                    {t(loc, "publishedOn")} {formatDate(pr.createdAt, loc)}
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
                            alt={getImageAlt(pr.featuredImage, pr.title)}
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
                        __html: processContent(pr.content),
                    }}
                />

                <ShareButtons title={pr.title} label={t(loc, "share")} />
            </div>
        </article>
    );
}
