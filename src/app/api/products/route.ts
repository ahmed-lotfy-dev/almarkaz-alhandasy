import { db } from "@/db";
import { products } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import * as z from "zod";

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  categoryId: z.string().optional(),
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().default(false),
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
    const validatedData = productSchema.parse(body);

    await db.insert(products).values({
      name: validatedData.name,
      description: validatedData.description,
      price: validatedData.price.toString(), 
      stock: validatedData.stock,
      categoryId: validatedData.categoryId ? validatedData.categoryId : null,
      image: validatedData.imageUrl,
      isFeatured: validatedData.isFeatured,
      // slug: validatedData.name.toLowerCase().replace(/ /g, '-'), // Manual slug or generated
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid data", { status: 400 });
    }
    console.error("Product Creation Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
