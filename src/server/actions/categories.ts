"use server";

import { categoryQueries } from "@/db/queries/categories";
import { categories } from "@/db/schema";
import { revalidatePath } from "next/cache";

export type CategoryData = typeof categories.$inferInsert;

export async function getCategories() {
  return await categoryQueries.findAll();
}

export async function getCategoryById(id: string) {
  return await categoryQueries.findById(id);
}

export async function createCategory(data: CategoryData) {
  try {
    await categoryQueries.create(data);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategory(id: string, data: Partial<CategoryData>) {
  try {
    await categoryQueries.update(id, data);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await categoryQueries.delete(id);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}
