export const dynamic = "force-dynamic";

import { HeroCarousel } from "@/components/features/landing/HeroCarousel";
import { AboutUs } from "@/features/landing/components/AboutUs";
import { LocationSection } from "@/features/landing/components/LocationSection";
import { CategoriesSection } from "@/features/landing/components/CategoriesSection";
import { heroSlideQueries } from "@/db/queries/hero-slides";

export default async function Home() {
  const slides = await heroSlideQueries.findActive();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <HeroCarousel slides={slides.length > 0 ? slides : undefined} />
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Products (Placeholder) */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold font-cairo mb-8 text-center">
          أحدث المنتجات
        </h2>
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          {/* Placeholder for Featured Products */}
          <div className="h-64 border-2 border-dashed rounded-lg flex items-center justify-center bg-accent/20">
            <p className="text-xl">قسم المنتجات المميزة (قريباً)</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <AboutUs />

      {/* Location Section */}
      <LocationSection />
    </main>
  );
}
