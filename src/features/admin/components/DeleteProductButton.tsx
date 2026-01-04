"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("حدث خطأ أثناء الحذف");
      }
    } catch (error) {
      console.error(error);
      alert("خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={loading} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
