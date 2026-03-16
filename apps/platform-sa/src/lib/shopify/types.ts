export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
  image?: ShopifyImage;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange: {
    minVariantPrice: Money;
  };
  variants: { nodes: ProductVariant[] };
  tags: string[];
  vendor: string;
  availableForSale: boolean;
  totalInventory: number | null;
  metafields?: { key: string; value: string; namespace: string }[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: { nodes: Product[] };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: Pick<Product, "id" | "handle" | "title" | "featuredImage">;
    price: Money;
  };
  cost: {
    totalAmount: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { nodes: CartLine[] };
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
}

export interface ShopifyError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
}
