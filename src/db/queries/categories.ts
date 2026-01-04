import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const categoryQueries = {
  /**
   * Find all categories ordered by creation date (newest first)
   */
  findAll: async () => {
    return db.select().from(categories).orderBy(desc(categories.createdAt));
  },

  /**
   * Find a single category by ID
   */
  findById: async (id: string) => {
    return db.query.categories.findFirst({
      where: eq(categories.id, id),
    });
  },

  /**
   * Find a category by slug
   */
  findBySlug: async (slug: string) => {
    return db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });
  },

  /**
   * Create a new category
   */
  create: async (data: typeof categories.$inferInsert) => {
    const [category] = await db.insert(categories).values(data).returning();
    return category;
  },

  /**
   * Update a category
   */
  update: async (id: string, data: Partial<typeof categories.$inferInsert>) => {
    const [updated] = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();
    return updated;
  },

  /**
   * Delete a category
   */
  delete: async (id: string) => {
    const [deleted] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();
    return deleted;
  },
};
