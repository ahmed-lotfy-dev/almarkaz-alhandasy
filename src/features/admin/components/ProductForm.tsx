"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";

// Schema
const productSchema = z.object({
  name: z.string({ message: "اسم المنتج مطلوب" }).min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  description: z.string().optional(),
  price: z.coerce.number({ message: "السعر مطلوب" }).min(0, "السعر يجب أن يكون رقم موجب"),
  stock: z.coerce.number().min(0).default(0),
  categoryId: z.string({ message: "القسم مطلوب" }).optional(), // Optional for now until we fetch categories
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

interface ProductFormProps {
  initialData?: any; // To implement later for edit
}

export function ProductForm({ initialData }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      categoryId: "1",
      isFeatured: initialData?.isFeatured || false,
      imageUrl: initialData?.image || "",
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("تم إضافة المنتج بنجاح");
        window.location.href = "/admin/products";
      } else {
        alert("حدث خطأ أثناء الحفظ");
      }
    } catch (error) {
      console.error(error);
      alert("خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-card p-6 rounded-lg border shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المنتج</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: فلتر 7 مراحل" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>السعر (ج.م)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.5" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف المنتج</FormLabel>
              <FormControl>
                <Textarea placeholder="وصف تفصيلي للمنتج..." {...field} className="text-right resize-none h-32" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الكمية المتاحة</FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Select - Placeholder until fetching categories */}
          <FormItem>
            <FormLabel>القسم (قريباً)</FormLabel>
            <Select disabled>
              <FormControl>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">فلاتر</SelectItem>
                <SelectItem value="2">غسالات</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </div>

        {/* Image Upload Placeholder */}
        <div className="space-y-2">
          <FormLabel>صورة المنتج</FormLabel>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">اضغط لرفع صورة (سيتم تفعيل الرفع قريباً)</span>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "حفظ المنتج"}
        </Button>
      </form>
    </Form>
  );
}
