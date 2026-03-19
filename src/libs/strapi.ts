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

export async function getEvents(
    page = 1,
    pageSize = 9,
    locale: Locale = "fr",
    upcoming?: boolean,
) {
    const params: Record<string, unknown> = {
        populate: ["featuredImage", "categories"],
        sort: "dateStart:desc",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        locale,
        status: "published",
    };
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
