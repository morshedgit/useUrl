import type { NextRequest } from "next/server";
import { readTokenFromFile } from "./lib/services/fileService";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  const token = await readTokenFromFile()

  console.log(token)

  if (!token) {
    // Create a new Response object for the redirect
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${process.env.HOST}/api/install?shop=404-zone.myshopify.com`,
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
    "/((?!api/install|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
