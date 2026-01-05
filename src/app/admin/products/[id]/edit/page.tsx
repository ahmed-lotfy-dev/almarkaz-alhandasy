export const dynamic = "force-dynamic";

import { ProductForm } from "@/features/admin/components/ProductForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-cairo text-primary">
          تعديل المنتج
        </h1>
      </div>

      <ProductForm initialData={product} productId={id} />
    </div>
  );
}
