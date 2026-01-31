import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isAuthed = req.cookies.get("site_auth");

  if (!isAuthed) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
