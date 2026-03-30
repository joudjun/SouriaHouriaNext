import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryBySlug } from "@/libs/strapi";
import { strapiUrl } from "@/libs/image";
import { localePath, t } from "@/libs/locale";
import type { Locale } from "@/types";

/** Convert any YouTube URL to its embeddable form. */
function toEmbedUrl(url: string): string {
    try {
        const u = new URL(url);
        // Already an embed link
        if (u.pathname.startsWith("/embed/")) return url;
        // youtu.be/VIDEO_ID
        if (u.hostname === "youtu.be") {
            return `https://www.youtube-nocookie.com/embed${u.pathname}`;
        }
        // youtube.com/watch?v=VIDEO_ID
        const v = u.searchParams.get("v");
        if (v) {
            return `https://www.youtube-nocookie.com/embed/${v}`;
        }
    } catch {
        // not a valid URL, return as-is
    }
    return url;
}

export const revalidate = 300;

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const gallery = await getGalleryBySlug(slug, locale as Locale);
    if (!gallery) return { title: "Galerie introuvable" };
    return {
        title: `${gallery.title} — Souria Houria`,
    };
}

export default async function GalleryPage({ params }: Props) {
    const { locale, slug } = await params;
    const loc = locale as Locale;

    const gallery = await getGalleryBySlug(slug, loc);

    if (!gallery) {
        notFound();
    }

    const images = (gallery.images ?? []).map((img) => ({
        url: strapiUrl(img.url),
        alt: img.alternativeText || gallery.title,
    }));

    return (
        <section className="section">
            <div className="container">
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        {
                            label: t(loc, "galleries"),
                            href: localePath(loc, "/galleries"),
                        },
                        { label: gallery.title },
                    ]}
                />

                <h1>{gallery.title}</h1>

                {gallery.type === "video" && gallery.videoUrl ? (
                    <div
                        style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                            height: 0,
                            marginTop: "var(--space-6)",
                            borderRadius: "var(--radius-lg)",
                            overflow: "hidden",
                        }}
                    >
                        <iframe
                            src={toEmbedUrl(gallery.videoUrl)}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: "none",
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    images.length > 0 && (
                        <div style={{ marginTop: "var(--space-6)" }}>
                            <GalleryGrid images={images} />
                        </div>
                    )
                )}

                {gallery.type === "gallery" && images.length === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "var(--neutral-400)",
                            padding: "var(--space-8) 0",
                        }}
                    >
                        {loc === "ar"
                            ? "لا توجد صور في هذا المعرض."
                            : "Aucune image dans cette galerie."}
                    </p>
                )}
            </div>
        </section>
    );
}
