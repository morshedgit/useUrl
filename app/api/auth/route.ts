import { writeTokenToFile } from "@/lib/services/fileService";
import { setXShopifyToken } from "@/lib/services/tokenService";



export async function GET(request: Request) {
  console.log("Initializing OAuth Code Flow");

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const shop = url.searchParams.get("shop");
  const state = url.searchParams.get("state");

  // Security checks should be implemented here

  const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
  const accessTokenPayload = {
    client_id: process.env.SHOPIFY_API_KEY,
    client_secret: process.env.SHOPIFY_API_SECRET,
    code,
  };

  const response = await fetch(accessTokenRequestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(accessTokenPayload),
  });

  const { access_token } = await response.json();
  // Store the access token securely
  console.log("Access_Token: ", access_token);

  setXShopifyToken(access_token);

  writeTokenToFile(access_token)

  // Create a new Response object for the redirect
  return new Response(null, {
    status: 302,
    headers: {
      Location: `/?shop=${shop}`,
    },
  });
}
