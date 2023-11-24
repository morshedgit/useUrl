export async function GET(request: Request) {
  // Extract the code from the query parameters
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  console.log("Reached");

  if (!code) {
    console.log("No code provided");
    return new Response(JSON.stringify({ error: "No code provided" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Define your API Key and Secret here (or better, as environment variables)
  const apiKey = process.env.SHOPIFY_API_KEY;
  const apiSecret = process.env.SHOPIFY_API_SECRET;
  const shop = url.searchParams.get("shop");

  // Your app's redirection URL
  const redirectUri = `https://${request.headers.get("host")}/api/auth`;

  // Prepare the request for the access token
  const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
  const accessTokenPayload = {
    client_id: apiKey,
    client_secret: apiSecret,
    code,
  };

  try {
    const response = await fetch(accessTokenRequestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accessTokenPayload),
    });

    if (!response.ok) {
      console.log(`Server responded with ${response.status}`);
      throw new Error(`Server responded with ${response.status}`);
    }

    const { access_token } = await response.json();

    // Here you would store the access token in a secure place
    console.log("ACCESS_TOKEN: ", access_token);

    // Respond with a success message (or redirect the user)
    return new Response(JSON.stringify({ ok: true, access_token }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
