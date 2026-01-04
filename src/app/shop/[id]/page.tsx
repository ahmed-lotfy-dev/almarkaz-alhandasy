import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;

    // Fetch product with category
    const [product] = await db
        .select({
            id: products.id,
            name: products.name,
            description: products.description,
            price: products.price,
            stock: products.stock,
            image: products.image,
            isFeatured: products.isFeatured,
            categoryName: categories.name,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(eq(products.id, id))
        .limit(1);

    if (!product) {
        notFound();
    }

    const inStock = (product.stock || 0) > 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery (Placeholder for single image now) */}
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            لا توجد صورة
                        </div>
                    )}
                    {product.isFeatured && (
                        <Badge className="absolute top-4 right-4 text-lg px-3 py-1">مميز</Badge>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    <div>
                        {product.categoryName && (
                            <Badge variant="outline" className="mb-2 text-sm text-muted-foreground">
                                {product.categoryName}
                            </Badge>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold font-cairo text-foreground">
                            {product.name}
                        </h1>
                    </div>

                    <div className="text-4xl font-bold text-primary">
                        {product.price} ج.م
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                        <p>{product.description || "لا يوجد وصف لهذا المنتج."}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        {inStock ? (
                            <span className="flex items-center text-green-600 gap-1 font-medium">
                                <Check className="w-4 h-4" /> متوفر في المخزون ({product.stock} قطعة)
                            </span>
                        ) : (
                            <span className="flex items-center text-destructive gap-1 font-medium">
                                <X className="w-4 h-4" /> غير متوفر حالياً
                            </span>
                        )}
                    </div>

                    <div className="flex gap-4 mt-auto">
                        <Button size="lg" className="w-full flex-1 gap-2 text-lg" disabled={!inStock}>
                            <ShoppingCart className="w-5 h-5" />
                            {inStock ? "إضافة للسلة" : "نفذت الكمية"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
