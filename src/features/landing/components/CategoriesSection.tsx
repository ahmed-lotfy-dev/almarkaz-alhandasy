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
    <section className="container mx-auto px-4 py-20 bg-accent/5">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl font-bold font-cairo text-primary">تصفح الأقسام</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">استكشف منتجاتنا المتنوعة من قطع الغيار الأصلية وفلاتر المياه</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {allCategories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="group relative flex flex-col items-center justify-center gap-6 p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              {category.imageUrl ? (
                // If we had real images, we'd use NextImage here
                <Package className="w-10 h-10" />
              ) : (
                <Package className="w-10 h-10" />
              )}
            </div>

            <div className="text-center relative z-10">
              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
              {category.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 max-w-[150px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity">
                  {category.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
