const randomNonce = () => String(Math.random());

export async function GET(request: Request) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (!shop) {
    return new Response(JSON.stringify({ error: "No shop provided" }), {
      status: 400,
    });
  }

  const scopes = "write_products,read_orders";
  const redirectUri = `${process.env.HOST}/api/auth`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${
    process.env.SHOPIFY_API_KEY
  }&scope=${scopes}&redirect_uri=${redirectUri}&state=${randomNonce()}`;

  // Create a new Response object for the redirect
  return new Response(null, {
    status: 302,
    headers: {
      Location: installUrl,
    },
  });
}
