export const dynamic = "force-dynamic";

import { CategoryForm } from "@/features/admin/components/CategoryForm";
import { categoryQueries } from "@/db/queries/categories";
import { notFound, redirect } from "next/navigation";
import { updateCategory } from "@/server/actions/categories";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await categoryQueries.findById(id);

  if (!category) {
    notFound();
  }

  async function handleSubmit(values: any) {
    "use server";
    await updateCategory(id, values);
    redirect("/admin/categories");
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-cairo mb-8">تعديل القسم</h1>
      <CategoryForm
        initialData={{
          name: category.name,
          slug: category.slug,
          description: category.description || "",
          imageUrl: category.imageUrl || "",
          isActive: category.isActive || false,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
