import Link from "next/link";
import type { Locale } from "@/types";
import { t } from "@/libs/locale";

interface PaginationProps {
    page: number;
    pageCount: number;
    locale: Locale;
    buildHref: (page: number) => string;
}

/** Build a compact page range: 1 … 4 5 [6] 7 8 … 20 */
function getPageRange(page: number, pageCount: number): (number | "ellipsis")[] {
    const siblings = 1;
    const items: (number | "ellipsis")[] = [];

    const rangeStart = Math.max(2, page - siblings);
    const rangeEnd = Math.min(pageCount - 1, page + siblings);

    items.push(1);

    if (rangeStart > 2) items.push("ellipsis");

    for (let i = rangeStart; i <= rangeEnd; i++) items.push(i);

    if (rangeEnd < pageCount - 1) items.push("ellipsis");

    if (pageCount > 1) items.push(pageCount);

    return items;
}

export default function Pagination({ page, pageCount, locale, buildHref }: PaginationProps) {
    if (pageCount <= 1) return null;

    const pages = getPageRange(page, pageCount);

    return (
        <div className="pagination">
            {page > 1 && (
                <Link href={buildHref(page - 1)} className="prev">
                    {t(locale, "prev")}
                </Link>
            )}
            {pages.map((item, idx) =>
                item === "ellipsis" ? (
                    <span key={`ellipsis-${idx}`} className="pagination-ellipsis">…</span>
                ) : (
                    <Link
                        key={item}
                        href={buildHref(item)}
                        className={item === page ? "active" : ""}
                    >
                        {item}
                    </Link>
                ),
            )}
            {page < pageCount && (
                <Link href={buildHref(page + 1)} className="next">
                    {t(locale, "next")}
                </Link>
            )}
        </div>
    );
}
