import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const messages = {
    required: {
        fr: "L\u2019adresse email est requise.",
        ar: "البريد الإلكتروني مطلوب.",
    },
    duplicate: {
        fr: "Cette adresse est déjà inscrite.",
        ar: "هذا البريد الإلكتروني مسجل بالفعل.",
    },
    failed: {
        fr: "L\u2019inscription a échoué. Veuillez réessayer.",
        ar: "فشل الاشتراك. يرجى المحاولة مرة أخرى.",
    },
};

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, locale } = body;
    const loc = locale === "ar" ? "ar" : "fr";

    if (!email) {
        return NextResponse.json(
            { error: messages.required[loc] },
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
        // Strapi returns 400 for unique constraint (duplicate email)
        const isDuplicate =
            axios.isAxiosError(err) && err.response?.status === 400;
        return NextResponse.json(
            { error: isDuplicate ? messages.duplicate[loc] : messages.failed[loc] },
            { status: isDuplicate ? 400 : 500 },
        );
    }
}
