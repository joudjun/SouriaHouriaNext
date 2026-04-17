import axios from "axios";
import type {
    StrapiResponse,
    StrapiArticle,
    StrapiEvent,
    StrapiGallery,
    StrapiPressRelease,
    StrapiCategory,
    Locale,
} from "@/types";

// ─── Axios instance ─────────────────────────────────────────────

const api = axios.create({
    baseURL: `${process.env.STRAPI_URL}/api`,
    headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
});

// ─── Articles ───────────────────────────────────────────────────

export async function getArticles(
    page = 1,
    pageSize = 9,
    locale: Locale = "fr",
    categorySlug?: string,
) {
    const params: Record<string, unknown> = {
        populate: ["featuredImage", "categories", "author"],
        sort: "createdAt:desc",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        locale,
        status: "published",
    };
    if (categorySlug) {
        params["filters[categories][slug][$eq]"] = categorySlug;
    }
    const { data } = await api.get<StrapiResponse<StrapiArticle[]>>(
        "/articles",
        { params },
    );
    return data;
}

export async function getArticleBySlug(slug: string, locale: Locale = "fr") {
    const decoded = decodeURIComponent(slug);
    const { data } = await api.get<StrapiResponse<StrapiArticle[]>>(
        "/articles",
        {
            params: {
                "filters[slug][$eq]": decoded,
                populate: ["featuredImage", "categories", "author"],
                locale,
                status: "published",
            },
        },
    );
    return data.data[0] ?? null;
}

export async function articleExistsInLocale(
    slug: string,
    locale: Locale,
): Promise<boolean> {
    const decoded = decodeURIComponent(slug);
    const { data } = await api.get<StrapiResponse<StrapiArticle[]>>(
        "/articles",
        {
            params: {
                "filters[slug][$eq]": decoded,
                "fields[0]": "id",
                locale,
                status: "published",
            },
        },
    );
    return data.data.length > 0;
}

// ─── Events ─────────────────────────────────────────────────────

export const EVENT_TYPES = [
    "souriahouria",
    "sundays",
    "apricot",
    "speeches",
] as const;

export type EventTypeFilter = (typeof EVENT_TYPES)[number];

export function isValidEventType(v: string): v is EventTypeFilter {
    return (EVENT_TYPES as readonly string[]).includes(v);
}

export async function getEvents(
    page = 1,
    pageSize = 9,
    locale: Locale = "fr",
    upcoming?: boolean,
    eventType?: EventTypeFilter,
) {
    const params: Record<string, unknown> = {
        populate: ["featuredImage", "categories"],
        sort: "dateStart:desc",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        locale,
        status: "published",
    };

    if (eventType) {
        params["filters[eventType][$eq]"] = eventType;
    } else {
        // Only show the 4 association event types, exclude "general"
        EVENT_TYPES.forEach((t, i) => {
            params[`filters[$or][${i}][eventType][$eq]`] = t;
        });
    }

    if (upcoming === true) {
        params["filters[dateStart][$gte]"] = new Date().toISOString();
        params.sort = "dateStart:asc";
    } else if (upcoming === false) {
        params["filters[dateStart][$lt]"] = new Date().toISOString();
    }
    const { data } = await api.get<StrapiResponse<StrapiEvent[]>>("/events", {
        params,
    });
    return data;
}

export async function getEventBySlug(slug: string, locale: Locale = "fr") {
    const decoded = decodeURIComponent(slug);
    const { data } = await api.get<StrapiResponse<StrapiEvent[]>>("/events", {
        params: {
            "filters[slug][$eq]": decoded,
            populate: ["featuredImage", "categories"],
            locale,
            status: "published",
        },
    });
    return data.data[0] ?? null;
}

export async function eventExistsInLocale(
    slug: string,
    locale: Locale,
): Promise<boolean> {
    const decoded = decodeURIComponent(slug);
    const { data } = await api.get<StrapiResponse<StrapiEvent[]>>("/events", {
        params: {
            "filters[slug][$eq]": decoded,
            "fields[0]": "id",
            locale,
            status: "published",
        },
    });
    return data.data.length > 0;
}

// ─── Galleries ──────────────────────────────────────────────────

export async function getGalleries(
    page = 1,
    pageSize = 12,
    locale: Locale = "fr",
) {
    const { data } = await api.get<StrapiResponse<StrapiGallery[]>>(
        "/galleries",
        {
            params: {
                populate: ["coverImage", "images"],
                sort: "createdAt:desc",
                "pagination[page]": page,
                "pagination[pageSize]": pageSize,
                locale,
                status: "published",
            },
        },
    );
    return data;
}

// ─── Press releases ─────────────────────────────────────────────

export async function getPressReleases(
    page = 1,
    pageSize = 9,
    locale: Locale = "fr",
) {
    const { data } = await api.get<StrapiResponse<StrapiPressRelease[]>>(
        "/press-releases",
        {
            params: {
                populate: ["featuredImage"],
                sort: "createdAt:desc",
                "pagination[page]": page,
                "pagination[pageSize]": pageSize,
                locale,
                status: "published",
            },
        },
    );
    return data;
}

export async function getPressReleaseBySlug(
    slug: string,
    locale: Locale = "fr",
) {
    const decoded = decodeURIComponent(slug);
    const { data } = await api.get<StrapiResponse<StrapiPressRelease[]>>(
        "/press-releases",
        {
            params: {
                "filters[slug][$eq]": decoded,
                populate: ["featuredImage"],
                locale,
                status: "published",
            },
        },
    );
    return data.data[0] ?? null;
}

export async function pressReleaseExistsInLocale(
    slug: string,
    locale: Locale,
): Promise<boolean> {
    const decoded = decodeURIComponent(slug);
    const { data } = await api.get<StrapiResponse<StrapiPressRelease[]>>(
        "/press-releases",
        {
            params: {
                "filters[slug][$eq]": decoded,
                "fields[0]": "id",
                locale,
                status: "published",
            },
        },
    );
    return data.data.length > 0;
}

export async function getGalleryBySlug(slug: string, locale: Locale = "fr") {
    const decoded = decodeURIComponent(slug);
    const { data } = await api.get<StrapiResponse<StrapiGallery[]>>(
        "/galleries",
        {
            params: {
                "filters[slug][$eq]": decoded,
                populate: ["coverImage", "images"],
                locale,
                status: "published",
            },
        },
    );
    return data.data[0] ?? null;
}

/** Returns which event types have at least 1 published event for a locale. */
export async function getActiveEventTypes(
    locale: Locale = "fr",
): Promise<Set<EventTypeFilter>> {
    const counts = await Promise.all(
        EVENT_TYPES.map((et) =>
            api
                .get<StrapiResponse<StrapiEvent[]>>("/events", {
                    params: {
                        "filters[eventType][$eq]": et,
                        locale,
                        status: "published",
                        "pagination[pageSize]": 1,
                    },
                })
                .then((r) => [et, r.data.meta.pagination!.total] as const),
        ),
    );
    return new Set(
        counts.filter(([, total]) => total > 0).map(([et]) => et),
    );
}

/** Returns category slugs that have at least 1 published article for a locale. */
export async function getActiveCategorySlugs(
    locale: Locale = "fr",
): Promise<Set<string>> {
    const cats = await getCategories(locale);
    const checks = await Promise.all(
        cats.map((cat) =>
            api
                .get<StrapiResponse<StrapiArticle[]>>("/articles", {
                    params: {
                        "filters[categories][slug][$eq]": cat.slug,
                        locale,
                        status: "published",
                        "pagination[pageSize]": 1,
                    },
                })
                .then((r) => [cat.slug, r.data.meta.pagination!.total] as const),
        ),
    );
    return new Set(
        checks.filter(([, total]) => total > 0).map(([slug]) => slug),
    );
}

// ─── Categories ─────────────────────────────────────────────────

export async function getCategories(locale: Locale = "fr") {
    const { data } = await api.get<StrapiResponse<StrapiCategory[]>>(
        "/categories",
        {
            params: {
                populate: ["parent", "children"],
                locale,
                "pagination[pageSize]": 100,
            },
        },
    );
    return data.data;
}

// ─── Search ─────────────────────────────────────────────────────

export interface SearchResults {
    articles: StrapiArticle[];
    events: StrapiEvent[];
    pressReleases: StrapiPressRelease[];
}

export async function searchContent(
    query: string,
    locale: Locale = "fr",
    limit = 5,
): Promise<SearchResults> {
    const common = {
        "filters[title][$containsi]": query,
        locale,
        status: "published" as const,
        "pagination[pageSize]": limit,
        sort: "createdAt:desc",
    };

    const [articles, events, pressReleases] = await Promise.all([
        api
            .get<StrapiResponse<StrapiArticle[]>>("/articles", {
                params: {
                    ...common,
                    populate: ["featuredImage", "categories"],
                },
            })
            .then((r) => r.data.data),
        api
            .get<StrapiResponse<StrapiEvent[]>>("/events", {
                params: {
                    ...common,
                    populate: ["featuredImage", "categories"],
                    ...Object.fromEntries(
                        EVENT_TYPES.map((t, i) => [
                            `filters[$or][${i}][eventType][$eq]`,
                            t,
                        ]),
                    ),
                },
            })
            .then((r) => r.data.data),
        api
            .get<StrapiResponse<StrapiPressRelease[]>>("/press-releases", {
                params: {
                    ...common,
                    populate: ["featuredImage"],
                },
            })
            .then((r) => r.data.data),
    ]);

    return { articles, events, pressReleases };
}

// ─── Global Settings ───────────────────────────────────────────

export interface SiteGlobal {
    email: string;
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
    x: string | null;
}

let globalCache: SiteGlobal | null = null;

export async function getSiteGlobal(): Promise<SiteGlobal> {
    if (globalCache) return globalCache;

    try {
        const res = await api.get<{ data: SiteGlobal }>("/global");
        globalCache = res.data.data;
        return globalCache;
    } catch {
        // Fallback defaults if global isn't set up yet
        return {
            email: "info@souriahouria.com",
            facebook: "https://www.facebook.com/SouriaHouriaCOM",
            instagram: "https://www.instagram.com/souria.houria",
            youtube: "https://www.youtube.com/@SouriaHouria",
            x: "https://x.com/SouriaHouriaFR",
        };
    }
}
