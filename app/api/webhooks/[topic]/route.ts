// pages/api/webhook.js
import { AddLog } from "@/lib/api";
import crypto from "crypto";

// Shopify client secret
const CLIENT_SECRET = process.env.CLIENT_SECRET; // In production, use an environment variable

export async function POST(
  req: Request,
  { params }: { params: { topic: string } }
) {
  try {
    const body = await req.json();

    AddLog(body, "Shopify");

    console.log({ topic: params.topic, body });

    if (!CLIENT_SECRET) throw new Error("No Client Secret Provided");

    const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
    const XShopifyTopic = req.headers.get("X-Shopify-Topic");
    const XShopifyHmacSha256 = req.headers.get("X-Shopify-Hmac-Sha256");
    const XShopifyShopDomain = req.headers.get("X-Shopify-Shop-Domain");
    const XShopifyAPIVersion = req.headers.get("X-Shopify-API-Version");
    const XShopifyWebhookId = req.headers.get("X-Shopify-Webhook-Id");
    const XShopifyTriggeredAt = req.headers.get("X-Shopify-Triggered-At");

    console.log({
      XShopifyTopic,
      XShopifyHmacSha256,
      XShopifyShopDomain,
      XShopifyAPIVersion,
      XShopifyWebhookId,
      XShopifyTriggeredAt,
    });

    // Create a HMAC SHA256 hash of the body using the secret
    const hash = crypto
      .createHmac("sha256", CLIENT_SECRET)
      .update(JSON.stringify(body), "utf8")
      .digest("base64");

    if (
      !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hmacHeader || ""))
    ) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    return new Response("Webhook processed", {
      status: 200,
    });
  } catch (error: any) {
    console.error(error.code);
    if (error.code === "ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH") {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
