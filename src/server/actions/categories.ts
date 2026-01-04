"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CategoryData = typeof categories.$inferInsert;

export async function getCategories() {
  return await db.select().from(categories).orderBy(desc(categories.createdAt));
}

export async function getCategoryById(id: string) {
  return await db.query.categories.findFirst({
    where: eq(categories.id, id),
  });
}

export async function createCategory(data: CategoryData) {
  try {
    await db.insert(categories).values(data);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategory(id: string, data: Partial<CategoryData>) {
  try {
    await db.update(categories).set(data).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}
