// ─── Strapi response wrappers ───────────────────────────────────

export interface StrapiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface StrapiResponse<T> {
    data: T;
    meta: { pagination?: StrapiPagination };
}

// ─── Media ──────────────────────────────────────────────────────

export interface StrapiImageFormat {
    url: string;
    width: number;
    height: number;
}

export interface StrapiImage {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        large?: StrapiImageFormat;
    } | null;
}

// ─── Content types ──────────────────────────────────────────────

export interface StrapiArticle {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: StrapiImage | null;
    sourceName: string | null;
    sourceUrl: string | null;
    sourceDate: string | null;
    wpId: number | null;
    author: StrapiAuthor | null;
    categories: StrapiCategory[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
}

export interface StrapiEvent {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: StrapiImage | null;
    dateStart: string | null;
    dateEnd: string | null;
    eventType: "general" | "souriahouria" | "sundays" | "apricot" | "speeches";
    sourceName: string | null;
    sourceUrl: string | null;
    sourceDate: string | null;
    wpId: number | null;
    categories: StrapiCategory[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
}

export interface StrapiGallery {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    type: "gallery" | "video";
    coverImage: StrapiImage | null;
    images: StrapiImage[];
    videoUrl: string | null;
    wpId: number | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
}

export interface StrapiPressRelease {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: StrapiImage | null;
    wpId: number | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
}

export interface StrapiCategory {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    parent: StrapiCategory | null;
    children: StrapiCategory[];
    createdAt: string;
    updatedAt: string;
    locale: string;
}

export interface StrapiAuthor {
    id: number;
    documentId: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    locale: string;
}

// ─── Locale ─────────────────────────────────────────────────────

export type Locale = "fr" | "ar";
