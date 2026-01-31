import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { password } = await req.json();

    if (password !== process.env.SITE_PASSWORD) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set("site_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });


    return res;
}
