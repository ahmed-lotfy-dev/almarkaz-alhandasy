import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { ProductCard } from "@/components/features/products/ProductCard";
import { eq } from "drizzle-orm";

export default async function ShopPage() {
  const allProducts = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      image: products.image,
      isFeatured: products.isFeatured,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-cairo mb-8">المتجر</h1>

      {/* Filters (Later) */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image}
              categoryName={product.categoryName || undefined}
              isFeatured={product.isFeatured || false}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            لا توجد منتجات حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
