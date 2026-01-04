import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const productQueries = {
  /**
   * Find all products ordered by creation date (newest first)
   */
  findAll: async () => {
    return db.select().from(products).orderBy(desc(products.createdAt));
  },

  /**
   * Find a single product by ID
   */
  findById: async (id: string) => {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    return product || null;
  },

  /**
   * Create a new product
   */
  create: async (data: typeof products.$inferInsert) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
  },

  /**
   * Update a product
   */
  update: async (id: string, data: Partial<typeof products.$inferInsert>) => {
    const [updated] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
    return updated;
  },

  /**
   * Delete a product
   */
  delete: async (id: string) => {
    const [deleted] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return deleted;
  },
};
