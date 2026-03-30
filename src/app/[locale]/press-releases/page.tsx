import type { Metadata } from "next";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { getPressReleases } from "@/libs/strapi";
import { getImageUrl } from "@/libs/image";
import { formatDate, htmlExcerpt, localePath, t } from "@/libs/locale";
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
                ? "بيانات صحفية — سوريا حرية"
                : "Communiqués de presse — Souria Houria",
    };
}

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function PressReleasesPage({
    params,
    searchParams,
}: Props) {
    const { locale } = await params;
    const loc = locale as Locale;
    const sp = await searchParams;
    const page = Number(sp.page) || 1;

    const pressRes = await getPressReleases(page, 9, loc);
    const releases = pressRes.data;
    const pagination = pressRes.meta.pagination!;

    return (
        <section className="section">
            <div className="container">
                <Breadcrumbs
                    items={[
                        { label: t(loc, "home"), href: localePath(loc, "/") },
                        { label: t(loc, "pressReleases") },
                    ]}
                />

                <h1 className="mb-6">{t(loc, "pressReleases")}</h1>

                <div className="card-grid">
                    {releases.map((pr) => (
                        <Card
                            key={pr.id}
                            href={localePath(
                                loc,
                                `/press-releases/${pr.slug}`,
                            )}
                            image={getImageUrl(pr.featuredImage, pr.content)}
                            category={t(loc, "pressReleases")}
                            title={pr.title}
                            excerpt={htmlExcerpt(pr.content)}
                            date={formatDate(pr.createdAt, loc)}
                        />
                    ))}
                </div>

                {releases.length === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "var(--neutral-400)",
                            padding: "var(--space-8) 0",
                        }}
                    >
                        {loc === "ar"
                            ? "لا توجد بيانات صحفية."
                            : "Aucun communiqué de presse trouvé."}
                    </p>
                )}

                {pagination.pageCount > 1 && (
                    <Pagination
                        page={page}
                        pageCount={pagination.pageCount}
                        locale={loc}
                        buildHref={(p) =>
                            localePath(loc, `/press-releases?page=${p}`)
                        }
                    />
                )}
            </div>
        </section>
    );
}
