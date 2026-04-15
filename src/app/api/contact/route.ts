import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, subject, message, locale } = body;

    if (!name || !email || !subject || !message) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 },
        );
    }

    try {
        await axios.post(
            `${process.env.STRAPI_URL}/api/contact-submissions`,
            { data: { name, email, subject, message, locale } },
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            },
        );
        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        const message =
            axios.isAxiosError(err) && err.response?.data?.error?.message
                ? err.response.data.error.message
                : "Failed to submit";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
