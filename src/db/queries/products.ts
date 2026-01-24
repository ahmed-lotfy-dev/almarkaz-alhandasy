import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const productQueries = {
  /**
   * Find all products with their category names
   */
  findWithCategory: async () => {
    return db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        stock: products.stock,
        category: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));
  },

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
   * Find a single product by ID with category name
   */
  findByIdWithCategory: async (id: string) => {
    const [product] = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        stock: products.stock,
        image: products.image,
        isFeatured: products.isFeatured,
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
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
