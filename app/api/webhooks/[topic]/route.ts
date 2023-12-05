// pages/api/webhook.js
import crypto from "crypto";

// Shopify client secret
const CLIENT_SECRET = process.env.CLIENT_SECRET; // In production, use an environment variable

export async function POST(req: Request) {
  try {
    if (!CLIENT_SECRET) throw new Error("No Client Secret Provided");
    const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
    const body = JSON.stringify(req.body);

    // Create a HMAC SHA256 hash of the body using the secret
    const hash = crypto
      .createHmac("sha256", CLIENT_SECRET)
      .update(body, "utf8")
      .digest("base64");

    if (
      !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hmacHeader || ""))
    ) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    // Process the webhook payload
    // ...

    return new Response("Webhook processed", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
