import { CategoryForm } from "@/features/admin/components/CategoryForm";
import { createCategory } from "@/server/actions/categories";
import { redirect } from "next/navigation";

export default function NewCategoryPage() {
  async function handleSubmit(values: any) {
    "use server";
    await createCategory(values);
    redirect("/admin/categories");
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-cairo mb-8">إضافة قسم جديد</h1>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
