import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { queryOne } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const session = await queryOne<any>("SELECT * FROM `AdminSession` WHERE `token` = ?", [token]);
  if (!session || new Date(session.expiresAt) < new Date()) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
