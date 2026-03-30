import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { getGalleries } from "@/libs/strapi";
import { getImageUrl } from "@/libs/image";
import { localePath, t } from "@/libs/locale";
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
                ? "وسائطنا — سوريا حرية"
                : "Nos Médias — Souria Houria",
    };
}

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function GalleriesPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;
    const sp = await searchParams;
    const page = Number(sp.page) || 1;

    const galleriesRes = await getGalleries(page, 12, loc);
    const galleries = galleriesRes.data;
    const pagination = galleriesRes.meta.pagination!;

    return (
        <section className="section">
            <div className="container">
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        { label: t(loc, "galleries") },
                    ]}
                />

                <h1 className="mb-6">{t(loc, "galleries")}</h1>

                <div className="card-grid">
                    {galleries.map((g) => (
                        <Link
                            key={g.id}
                            href={localePath(loc, `/galleries/${g.slug}`)}
                            className="card"
                        >
                            <div
                                className="card-thumbnail"
                                style={{
                                    backgroundImage: `url('${getImageUrl(g.coverImage)}')`,
                                }}
                            >
                                {g.type === "video" && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background:
                                                "rgba(0,0,0,0.3)",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "2.5rem",
                                                color: "#fff",
                                            }}
                                        >
                                            ▶
                                        </span>
                                    </div>
                                )}
                                {g.type === "gallery" && g.images?.length > 0 && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "var(--space-2)",
                                            right: "var(--space-2)",
                                            background: "rgba(0,0,0,0.6)",
                                            color: "#fff",
                                            padding: "2px 8px",
                                            borderRadius: "var(--radius-sm)",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        {g.images.length}{" "}
                                        {loc === "ar" ? "صور" : "photos"}
                                    </div>
                                )}
                            </div>
                            <div className="card-body">
                                <span className="card-category">
                                    {g.type === "video"
                                        ? loc === "ar"
                                            ? "فيديو"
                                            : "Vidéo"
                                        : loc === "ar"
                                          ? "معرض صور"
                                          : "Galerie"}
                                </span>
                                <h3 className="card-title">{g.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {galleries.length === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "var(--neutral-400)",
                            padding: "var(--space-8) 0",
                        }}
                    >
                        {loc === "ar"
                            ? "لا توجد وسائط."
                            : "Aucun média trouvé."}
                    </p>
                )}

                {pagination.pageCount > 1 && (
                    <Pagination
                        page={page}
                        pageCount={pagination.pageCount}
                        locale={loc}
                        buildHref={(p) =>
                            localePath(loc, `/galleries?page=${p}`)
                        }
                    />
                )}
            </div>
        </section>
    );
}
