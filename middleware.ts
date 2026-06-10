import { NextResponse, type NextRequest } from "next/server";

const PRODUCTION_HOST = "www.greggrossman.com";
const REDIRECT_HOSTS = new Set(["greggrossman.vercel.app", "greggrossman.com"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";

  if (!REDIRECT_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https";
  url.hostname = PRODUCTION_HOST;
  url.port = "";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/:path*",
};
