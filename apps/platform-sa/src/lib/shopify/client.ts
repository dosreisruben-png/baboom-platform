import type { ShopifyError } from "./types";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const accessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
const apiVersion = "2024-04";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

// True when the store domain looks like a real configured store
export const isShopifyConfigured =
  !!domain &&
  domain !== "your-store.myshopify.com" &&
  domain !== "placeholder" &&
  domain.includes(".");

interface ShopifyResponse<T> {
  data: T;
  errors?: ShopifyError[];
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error("SHOPIFY_NOT_CONFIGURED");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  });

  if (!res.ok) {
    throw new Error(
      `Shopify API error: ${res.status} ${res.statusText}`
    );
  }

  const json = (await res.json()) as ShopifyResponse<T>;

  if (json.errors?.length) {
    throw new Error(
      json.errors.map((e) => e.message).join("\n")
    );
  }

  return json.data;
}
