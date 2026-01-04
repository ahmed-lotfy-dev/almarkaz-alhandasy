import { ProductForm } from "@/features/admin/components/ProductForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-cairo text-primary">إضافة منتج جديد</h1>
      </div>

      <ProductForm />
    </div>
  );
}
