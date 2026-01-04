"use server";

import { db } from "@/db";
import { heroSlides } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type HeroSlideData = typeof heroSlides.$inferInsert;

export async function updateHeroSlide(id: string, data: Partial<HeroSlideData>) {
  try {
    await db.update(heroSlides).set(data).where(eq(heroSlides.id, id));
    revalidatePath("/admin/carousel");
    revalidatePath("/"); // Update home page
    return { success: true };
  } catch (error) {
    console.error("Failed to update slide:", error);
    return { success: false, error: "Failed to update slide" };
  }
}

export async function createHeroSlide(data: HeroSlideData) {
  try {
    await db.insert(heroSlides).values(data);
    revalidatePath("/admin/carousel");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create slide:", error);
    return { success: false, error: "Failed to create slide" };
  }
}

export async function deleteHeroSlide(id: string) {
  try {
    await db.delete(heroSlides).where(eq(heroSlides.id, id));
    revalidatePath("/admin/carousel");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete slide:", error);
    return { success: false, error: "Failed to delete slide" };
  }
}
