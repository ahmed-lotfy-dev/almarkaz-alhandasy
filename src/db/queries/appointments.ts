import { db } from "@/db";
import { appointments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const appointmentQueries = {
  /**
   * Find all appointments ordered by creation date (newest first)
   */
  findAll: async () => {
    return db.select().from(appointments).orderBy(desc(appointments.createdAt));
  },

  /**
   * Find a single appointment by ID
   */
  findById: async (id: string) => {
    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);
    return appointment || null;
  },

  /**
   * Create a new appointment
   */
  create: async (data: typeof appointments.$inferInsert) => {
    const [appointment] = await db.insert(appointments).values(data).returning();
    return appointment;
  },

  /**
   * Update appointment status
   */
  updateStatus: async (id: string, status: string) => {
    const [updated] = await db
      .update(appointments)
      .set({ status })
      .where(eq(appointments.id, id))
      .returning();
    return updated;
  },

  /**
   * Delete an appointment
   */
  delete: async (id: string) => {
    const [deleted] = await db
      .delete(appointments)
      .where(eq(appointments.id, id))
      .returning();
    return deleted;
  },
};
