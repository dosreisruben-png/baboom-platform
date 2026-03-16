import { Hero } from "@/components/home/hero";
import { TrustBadges } from "@/components/home/trust-badges";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { SeasonalOffers } from "@/components/home/seasonal-offers";
import { InDemand } from "@/components/home/in-demand";
import { PromoBannerGrid } from "@/components/home/promo-banner-grid";
import { BestDeals } from "@/components/home/best-deals";
import { ExplorePromos } from "@/components/home/explore-promos";
import { B2BCallout } from "@/components/home/b2b-callout";
import { Newsletter } from "@/components/home/newsletter";
import { getFeaturedProducts } from "@/lib/shopify/queries";

export default async function HomePage() {
  // Fetch products server-side; pass to client carousel components
  const products = await getFeaturedProducts(12);

  return (
    <>
      {/* 1. Hero Slider */}
      <Hero />

      {/* 2. Trust badges */}
      <TrustBadges />

      {/* 3. Category Icon Row */}
      <FeaturedCategories />

      {/* 4. You May Be Interested (tabbed products) */}
      <FeaturedProducts />

      {/* 5. Seasonal Offers Best Choice */}
      <SeasonalOffers />

      {/* 6. In Demand This Week (carousel) */}
      <InDemand products={products} />

      {/* 7. Promotional Banner Grid */}
      <PromoBannerGrid />

      {/* 8. Best Deals of the Day (countdown + carousel) */}
      <BestDeals products={products} />

      {/* 9. Explore Current Promotions */}
      <ExplorePromos />

      {/* 10. B2B Callout */}
      <B2BCallout />

      {/* 11. Newsletter */}
      <Newsletter />
    </>
  );
}
