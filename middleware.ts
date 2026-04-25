import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function secretKey() {
  const raw = process.env.JWT_SECRET || (process.env.NODE_ENV === "development" ? "dev-insecure-secret-change-me" : "");
  if (!raw) throw new Error("JWT_SECRET missing");
  return new TextEncoder().encode(raw);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("aptagon_token")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  let role: string;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    role = String(payload.role ?? "");
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname.startsWith("/dashboard/teacher") && role !== "teacher") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname.startsWith("/dashboard/student") && role !== "student") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/admin/:path*", "/dashboard/teacher/:path*", "/dashboard/student/:path*"],
};
