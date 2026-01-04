import { db } from "@/db";
import { products } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
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

// GET Single Product (optional, if we need client-side fetch, but we mostly use server components)
// PUT Update Product
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Params are async in Next.js 15+
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const validatedData = productSchema.parse(body);

    await db
      .update(products)
      .set({
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price.toString(),
        stock: validatedData.stock,
        categoryId: validatedData.categoryId ? validatedData.categoryId : null,
        image: validatedData.imageUrl,
        isFeatured: validatedData.isFeatured,
      })
      .where(eq(products.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid data", { status: 400 });
    }
    console.error("Product Update Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE Product
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    await db.delete(products).where(eq(products.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product Delete Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
