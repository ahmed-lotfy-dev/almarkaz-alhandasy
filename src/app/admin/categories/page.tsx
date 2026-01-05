export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategories } from "@/server/actions/categories";
import { Plus, Trash2, Edit, Package } from "lucide-react";
import Link from "next/link";

export default async function CategoriesAdminPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-primary tracking-wide">إدارة الأقسام</h1>
          <p className="text-muted-foreground mt-1">عرض وتعديل أقسام المنتجات في الموقع</p>
        </div>
        <Button className="gap-2 shadow-lg hover:shadow-xl transition-all" size="lg" asChild>
          <Link href="/admin/categories/new">
            <Plus className="w-5 h-5" />
            إضافة قسم جديد
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Card key={category.id} className="overflow-hidden group hover:shadow-2xl hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="p-6 flex items-start justify-between bg-linear-to-brrom-card to-accent/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded-full mt-1 w-fit">{category.slug}</p>
                    </div>
                  </div>
                  {category.isActive ? (
                    <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" title="نشط" />
                  ) : (
                    <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" title="غير نشط" />
                  )}
                </div>

                <div className="px-6 py-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] leading-relaxed">
                    {category.description || "لا يوجد وصف"}
                  </p>
                </div>

                <div className="flex items-center gap-2 p-4 bg-muted/30 border-t border-border/50">
                  <Button variant="outline" size="sm" className="flex-1 gap-2 hover:bg-background hover:text-primary hover:border-primary/50 transition-colors" asChild>
                    <Link href={`/admin/categories/${category.id}/edit`}>
                      <Edit className="w-4 h-4" />
                      تعديل
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground bg-accent/5 rounded-3xl border-2 border-dashed border-border/50">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Package className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-lg font-medium">لا توجد أقسام حالياً</p>
            <p className="text-sm opacity-70 mt-1">ابدأ بإضافة قسم جديد لعرض المنتجات</p>
          </div>
        )}
      </div>
    </div>
  );
}
