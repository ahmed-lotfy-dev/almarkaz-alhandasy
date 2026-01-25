import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Package } from "lucide-react";
import Link from "next/link";

export async function CategoriesSection() {
  const allCategories = await db.select().from(categories).where(eq(categories.isActive, true));

  if (allCategories.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">تصفح الأقسام</h2>
        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
          استكشف منتجاتنا المتنوعة من قطع الغيار الأصلية وفلاتر المياه المختارة بعناية
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {allCategories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="group relative flex flex-col items-center justify-center gap-8 p-10 rounded-3xl glass-card transition-all duration-500 overflow-hidden"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon Container */}
            <div className="relative w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-accent/30 group-hover:-rotate-3">
              {category.imageUrl ? (
                <Package className="w-12 h-12" />
              ) : (
                <Package className="w-12 h-12" />
              )}

              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/50 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>

            <div className="text-center relative z-10 space-y-2">
              <h3 className="font-bold font-heading text-2xl group-hover:text-accent transition-colors duration-300">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-muted-foreground font-sans line-clamp-2 max-w-[200px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              )}
            </div>

            {/* Bottom Accent Bar */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />
          </Link>
        ))}
      </div>
    </section>
  );
}
