import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, locale } = body;

    if (!email) {
        return NextResponse.json(
            { error: "Email is required" },
            { status: 400 },
        );
    }

    try {
        await axios.post(
            `${process.env.STRAPI_URL}/api/newsletter-subscriptions`,
            { data: { email, locale } },
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            },
        );
        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        const status =
            axios.isAxiosError(err) && err.response?.status === 400
                ? 400
                : 500;
        const message =
            axios.isAxiosError(err) && err.response?.data?.error?.message
                ? err.response.data.error.message
                : "Failed to subscribe";
        return NextResponse.json({ error: message }, { status });
    }
}
