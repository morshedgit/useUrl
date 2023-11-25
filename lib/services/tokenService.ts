let X_Shopify_Token: string | null = null;

export const setXShopifyToken = (token: string) => {
  X_Shopify_Token = token;
};
export const getXShopifyToken = (): string | null => X_Shopify_Token;
