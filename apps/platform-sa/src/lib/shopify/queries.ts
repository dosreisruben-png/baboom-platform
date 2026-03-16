import { shopifyFetch, isShopifyConfigured } from "./client";
import type { Product, Collection, Cart } from "./types";
import { MOCK_PRODUCTS, MOCK_PRODUCTS_BY_HANDLE } from "../mock-products";

// ─── Fragments ────────────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    totalInventory
    tags
    vendor
    featuredImage { url altText width height }
    images(first: 10) { nodes { url altText width height } }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    variants(first: 50) {
      nodes {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
        image { url altText width height }
      }
    }
  }
`;

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts({
  first = 20,
  after,
  query,
  sortKey = "RELEVANCE",
  reverse = false,
}: {
  first?: number;
  after?: string;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
} = {}): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> {
  if (!isShopifyConfigured) {
    const filtered = query
      ? MOCK_PRODUCTS.filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => query.toLowerCase().includes(t))
        )
      : MOCK_PRODUCTS;
    return { products: filtered.slice(0, first), hasNextPage: false, endCursor: null };
  }
  try {
    const data = await shopifyFetch<{
      products: {
        nodes: Product[];
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    }>({
      query: `
        ${PRODUCT_FRAGMENT}
        query GetProducts($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
          products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
            nodes { ...ProductFragment }
            pageInfo { hasNextPage endCursor }
          }
        }
      `,
      variables: { first, after, query, sortKey, reverse },
      tags: ["products"],
    });

    return {
      products: data.products.nodes,
      hasNextPage: data.products.pageInfo.hasNextPage,
      endCursor: data.products.pageInfo.endCursor,
    };
  } catch {
    return { products: [], hasNextPage: false, endCursor: null };
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) {
    return MOCK_PRODUCTS_BY_HANDLE.get(handle) ?? null;
  }
  try {
    const data = await shopifyFetch<{ product: Product | null }>({
      query: `
        ${PRODUCT_FRAGMENT}
        query GetProduct($handle: String!) {
          product(handle: $handle) { ...ProductFragment }
        }
      `,
      variables: { handle },
      tags: [`product-${handle}`],
    });
    return data.product;
  } catch {
    return null;
  }
}

export async function getFeaturedProducts(first = 8): Promise<Product[]> {
  const { products } = await getProducts({
    first,
    query: "tag:featured",
    sortKey: "BEST_SELLING",
  });
  return products;
}

// ─── Collections ──────────────────────────────────────────────────────────────

export async function getCollections(first = 12): Promise<Collection[]> {
  try {
    const data = await shopifyFetch<{ collections: { nodes: Collection[] } }>({
      query: `
        query GetCollections($first: Int!) {
          collections(first: $first, sortKey: UPDATED_AT, reverse: true) {
            nodes {
              id
              handle
              title
              description
              image { url altText width height }
              products(first: 1) { nodes { id } }
            }
          }
        }
      `,
      variables: { first },
      tags: ["collections"],
    });
    return data.collections.nodes;
  } catch {
    return [];
  }
}

export async function getCollection(handle: string): Promise<Collection | null> {
  try {
    const data = await shopifyFetch<{ collection: Collection | null }>({
      query: `
        ${PRODUCT_FRAGMENT}
        query GetCollection($handle: String!) {
          collection(handle: $handle) {
            id handle title description
            image { url altText width height }
            products(first: 24, sortKey: BEST_SELLING) {
              nodes { ...ProductFragment }
            }
          }
        }
      `,
      variables: { handle },
      tags: [`collection-${handle}`],
    });
    return data.collection;
  } catch {
    return null;
  }
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              id handle title
              featuredImage { url altText width height }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
    query: `
      ${CART_FRAGMENT}
      mutation CartCreate {
        cartCreate { cart { ...CartFragment } }
      }
    `,
    cache: "no-store",
  });
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
    query: `
      ${CART_FRAGMENT}
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFragment }
        }
      }
    `,
    variables: { cartId, lines: [{ merchandiseId, quantity }] },
    cache: "no-store",
  });
  return data.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: Cart | null }>({
    query: `
      ${CART_FRAGMENT}
      query GetCart($cartId: ID!) {
        cart(id: $cartId) { ...CartFragment }
      }
    `,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart;
}
