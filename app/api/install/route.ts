import type { NextApiRequest, NextApiResponse } from "next";

const randomNonce = () => String(Math.random());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shop = req.query.shop as string;
  if (!shop) {
    return res.status(400).json({ error: "No shop provided" });
  }

  const scopes = "write_products,read_orders";
  const redirectUri = `${process.env.HOST}/api/auth`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${
    process.env.SHOPIFY_API_KEY
  }&scope=${scopes}&redirect_uri=${redirectUri}&state=${randomNonce()}`;

  res.redirect(302, installUrl);
}
