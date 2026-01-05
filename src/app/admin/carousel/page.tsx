export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { heroSlides } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CarouselAdminPage() {
  const slides = await db
    .select()
    .from(heroSlides)
    .orderBy(desc(heroSlides.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-cairo text-primary">
          صور العرض (Carousel)
        </h1>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة صورة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.length > 0 ? (
          slides.map((slide) => (
            <Card key={slide.id} className="overflow-hidden group relative">
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title || "Slide"}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/admin/carousel/${slide.id}/edit`}>
                      <Edit className="w-4 h-4 ml-2" />
                      تعديل
                    </Link>
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">
                  {slide.title || "بدون عنوان"}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {slide.description || "لا يوجد وصف"}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed">
            لا توجد صور للعرض حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
