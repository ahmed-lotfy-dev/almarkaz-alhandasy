"use server";

import { heroSlideQueries } from "@/db/queries/hero-slides";
import { heroSlides } from "@/db/schema";
import { revalidatePath } from "next/cache";

export type HeroSlideData = typeof heroSlides.$inferInsert;

export async function updateHeroSlide(id: string, data: Partial<HeroSlideData>) {
  try {
    await heroSlideQueries.update(id, data);
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
    await heroSlideQueries.create(data);
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
    await heroSlideQueries.delete(id);
    revalidatePath("/admin/carousel");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete slide:", error);
    return { success: false, error: "Failed to delete slide" };
  }
}
