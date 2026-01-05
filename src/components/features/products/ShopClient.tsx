"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/features/products/ProductCard";

type Product = {
  id: string;
  name: string;
  price: string | number;
  image?: string | null;
  categoryId?: string | null;
  categoryName?: string | null;
  isFeatured?: boolean;
};

export function ShopClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | "">("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = typeof window !== 'undefined' ? window.location.search : '';
    const url = `/api/products${params}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setProducts(data || []);
          // If the page URL had a category slug, try to set category state to the returned categoryId
          try {
            const sp = new URLSearchParams(params);
            const catParam = sp.get('category');
            if (catParam && data && data.length > 0 && !category) {
              const cid = data[0].categoryId;
              if (cid) setCategory(cid);
            }
          } catch (e) {
            /* ignore */
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of products) {
      if (p.categoryId && p.categoryName) map.set(p.categoryId, p.categoryName);
    }
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && p.categoryId !== category) return false;
      const price = Number(p.price);
      if (minPrice && price < Number(minPrice)) return false;
      if (maxPrice && price > Number(maxPrice)) return false;
      return true;
    });
  }, [products, search, category, minPrice, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-cairo mb-4">المتجر</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-3 items-start">
        <input
          aria-label="search"
          placeholder="ابحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full md:w-1/6"
        >
          <option value="">كل التصنيفات</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="الحد الأدنى للسعر"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="input input-bordered w-full md:w-1/6"
        />

        <input
          placeholder="الحد الأقصى للسعر"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input input-bordered w-full md:w-1/6"
        />
      </div>

      {loading ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">لا توجد منتجات مطابقة.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image || undefined}
              categoryName={product.categoryName || undefined}
              isFeatured={!!product.isFeatured}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopClient;
