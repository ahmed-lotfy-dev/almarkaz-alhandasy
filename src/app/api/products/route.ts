import { db } from "@/db";
import { productQueries } from "@/db/queries/products";
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

    await productQueries.create({
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

// GET list of products with optional query filters
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || undefined;
    const category = url.searchParams.get("category") || undefined;
    const minPrice = url.searchParams.get("minPrice")
      ? Number(url.searchParams.get("minPrice"))
      : undefined;
    const maxPrice = url.searchParams.get("maxPrice")
      ? Number(url.searchParams.get("maxPrice"))
      : undefined;

    // Build query via drizzle
    const { db } = await import("@/db");
    const { products, categories } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");

    let q = db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        image: products.image,
        isFeatured: products.isFeatured,
        categoryId: products.categoryId,
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));
    // If category provided, treat it as either category ID (uuid) or slug
    let rows;
    if (category) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        category
      );
      if (isUuid) {
        rows = await q.where(eq(products.categoryId, category));
      } else {
        rows = await q.where(eq(categories.slug, category));
      }
    } else {
      rows = await q;
    }

    // Apply simple numeric filtering in-memory (price)
    const filtered = rows.filter((p: any) => {
      const priceNum = Number(p.price);
      if (minPrice !== undefined && priceNum < minPrice) return false;
      if (maxPrice !== undefined && priceNum > maxPrice) return false;
      return true;
    });

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Products GET Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
