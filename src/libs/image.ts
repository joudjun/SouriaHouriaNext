import type { StrapiImage } from "@/types";

const FALLBACK_IMAGE = "/SouriaHouria.svg";

/**
 * Resolve an absolute URL for a Strapi-hosted image path.
 * Handles both absolute URLs and relative /uploads/... paths.
 */
export function strapiUrl(path: string): string {
    if (path.startsWith("http")) return path;
    return `${process.env.STRAPI_URL}${path}`;
}

/**
 * Smart image resolution with three-tier fallback:
 *   1. featuredImage from Strapi
 *   2. First <img> found in HTML content
 *   3. Static fallback /SouriaHouria.svg
 */
export function getImageUrl(
    featuredImage: StrapiImage | null | undefined,
    content?: string | null,
): string {
    // 1. Featured image
    if (featuredImage?.url) {
        return strapiUrl(featuredImage.url);
    }

    // 2. First inline image from CKEditor HTML
    if (content) {
        const match = content.match(/<img[^>]+src=["']([^"']+)["']/);
        if (match?.[1]) {
            return strapiUrl(match[1]);
        }
    }

    // 3. Fallback
    return FALLBACK_IMAGE;
}

/**
 * Rewrite relative /uploads/… URLs in HTML content to absolute Strapi URLs
 * so inline images render correctly in the browser.
 */
export function processContent(html: string): string {
    const base = process.env.STRAPI_URL ?? "";
    // Match src="..." and href="..." attributes pointing to /uploads/
    return html.replace(
        /((?:src|href|poster)\s*=\s*["'])(\/?uploads\/)/gi,
        (_, attr, path) => `${attr}${base}/${path.replace(/^\//, "")}`,
    );
}

/**
 * Get alt text for an image, falling back to a title string.
 */
export function getImageAlt(
    image: StrapiImage | null | undefined,
    fallback: string,
): string {
    return image?.alternativeText || fallback;
}
