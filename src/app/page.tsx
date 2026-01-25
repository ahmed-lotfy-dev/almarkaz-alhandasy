export const dynamic = "force-dynamic";

import { HeroCarousel } from "@/components/features/landing/HeroCarousel";
import { AboutUs } from "@/features/landing/components/AboutUs";
import { LocationSection } from "@/features/landing/components/LocationSection";
import { CategoriesSection } from "@/features/landing/components/CategoriesSection";
import { heroSlideQueries } from "@/db/queries/hero-slides";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package } from "lucide-react";

export default async function Home() {
  const slides = await heroSlideQueries.findActive();

                            return (
    <main className="min-h-screen bg-background selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section className="w-full mb-12">
        <HeroCarousel slides={slides.length > 0 ? slides : undefined} />
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-24 relative overflow-hidden">
        {/* Subtle Background Text */}
        <div className="absolute top-20 -left-20 text-[180px] font-bold text-slate-100 dark:text-slate-900/40 -z-10 select-none">
          PARTS
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold font-heading uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-accent" />
              المتجر
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-primary leading-tight">
              أحدث <br />
              <span className="text-accent underline decoration-accent/30 underline-offset-8">المنتجات الأصلية</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl font-sans">
              اكتشف تشكيلتنا الواسعة من قطع الغيار عالية الجودة وفلاتر المياه المختارة بعناية لتناسب احتياجاتكم.
            </p>
          </div>

          <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 font-bold border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white hover:border-primary transition-all">
            <Link href="/shop" className="flex items-center gap-2">
              عرض كل المنتجات
            </Link>
          </Button>
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="relative group p-20 rounded-3xl glass shadow-sm overflow-hidden border-dashed border-2 border-slate-200 dark:border-slate-800">
            {/* Pulsing Highlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Package className="w-10 h-10" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading">قسم المنتجات المميزة قيد التحضير</h3>
              <p className="text-muted-foreground max-w-md font-sans leading-relaxed">
                نحن نقوم الآن بتجهيز قائمة بأهم وأحدث المنتجات لتصل إليكم بأفضل جودة وسعر.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <AboutUs />

      {/* Location Section */}
      <LocationSection />

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative bg-linear-to-br from-primary to-accent text-primary-foreground rounded-[3rem] p-12 md:p-24 overflow-hidden shadow-2xl border border-primary/10">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-black/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 dark:bg-black/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-7xl font-bold font-heading leading-tight drop-shadow-sm">
              هل تواجه مشكلة <br />
              في غسالتك؟
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl font-sans leading-relaxed drop-shadow-sm">
              لا داعي للقلق، فريقنا الفني المتخصص جاهز لإصلاح كافة الأعطال بقطع غيار أصلية وضمان معتمد.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="h-16 px-10 text-xl rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-xl transition-all active:scale-95 border-none">
                <Link href="/book">احجز موعد صيانة الآن</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
