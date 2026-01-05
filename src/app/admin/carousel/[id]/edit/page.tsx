export const dynamic = "force-dynamic";

import { HeroSlideForm } from "@/features/admin/components/HeroSlideForm";
import { db } from "@/db";
import { heroSlides } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { updateHeroSlide } from "@/server/actions/hero-slides";

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await db.query.heroSlides.findFirst({
    where: eq(heroSlides.id, id),
  });

  if (!slide) {
    notFound();
  }

  // Adapter function to match the form submission signature
  async function handleSubmit(values: any) {
    "use server";
    await updateHeroSlide(id, values);
    redirect("/admin/carousel");
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-cairo mb-8">تعديل الشريحة</h1>
      <HeroSlideForm
        initialData={{
          id: slide.id,
          title: slide.title || "",
          description: slide.description || "",
          imageUrl: slide.imageUrl,
          linkUrl: slide.linkUrl || "",
          buttonText: slide.buttonText || "",
          order: slide.order || 0,
          isActive: slide.isActive || false,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
