import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/libs/strapi";
import type { Locale } from "@/types";

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
    const locale = (req.nextUrl.searchParams.get("locale") ?? "fr") as Locale;

    if (q.length < 2) {
        return NextResponse.json(
            { articles: [], events: [], pressReleases: [] },
        );
    }

    const results = await searchContent(q, locale, 5);
    return NextResponse.json(results);
}
