import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const messages = {
    required: {
        fr: "Tous les champs sont obligatoires.",
        ar: "جميع الحقول مطلوبة.",
    },
    failed: {
        fr: "L\u2019envoi a échoué. Veuillez réessayer.",
        ar: "فشل الإرسال. يرجى المحاولة مرة أخرى.",
    },
};

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, subject, message, locale } = body;
    const loc = locale === "ar" ? "ar" : "fr";

    if (!name || !email || !subject || !message) {
        return NextResponse.json(
            { error: messages.required[loc] },
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
    } catch {
        return NextResponse.json(
            { error: messages.failed[loc] },
            { status: 500 },
        );
    }
}
