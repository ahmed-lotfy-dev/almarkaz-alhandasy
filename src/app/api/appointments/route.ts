import { db } from "@/db";
import { appointments } from "@/db/schema";
import { auth } from "@/lib/auth"; // Server-side auth helper
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import * as z from "zod";

const appointmentSchema = z.object({
  serviceType: z.enum(["repair", "installation", "maintenance"]),
  machineType: z.enum(["washing_machine", "water_filter"]),
  date: z.string().transform((str) => new Date(str)), // Date comes as string from JSON
  address: z.string().min(5),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validatedData = appointmentSchema.parse(body);

    await db.insert(appointments).values({
      userId: session.user.id,
      serviceType: validatedData.serviceType,
      machineType: validatedData.machineType,
      date: validatedData.date,
      address: validatedData.address,
      notes: validatedData.notes,
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid data", { status: 400 });
    }
    console.error("Booking Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
