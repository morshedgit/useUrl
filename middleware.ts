import type { NextRequest } from "next/server";
import { getXShopifyToken } from "./lib/services/tokenService";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!getXShopifyToken()) {
    // Create a new Response object for the redirect
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/?shop=404-zone.myshopify.com`,
      },
    });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
