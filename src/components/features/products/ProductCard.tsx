import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string | number;
  imageUrl?: string | null;
  categoryName?: string | null;
  isFeatured?: boolean;
}

export function ProductCard({ id, name, price, imageUrl, categoryName, isFeatured }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col group overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
      <CardHeader className="p-0 relative aspect-square overflow-hidden bg-muted">
        {isFeatured && (
          <Badge className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground">مميز</Badge>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary">
            لا توجد صورة
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-4">
        {categoryName && (
          <p className="text-xs text-muted-foreground mb-2">{categoryName}</p>
        )}
        <h3 className="font-bold text-lg line-clamp-2 md:text-xl font-cairo mb-2 group-hover:text-primary transition-colors">
          <Link href={`/shop/${id}`}>
            {name}
          </Link>
        </h3>
        <p className="text-lg font-bold text-primary">
          {String(price)} ج.م
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" variant="secondary">
          <ShoppingCart className="w-4 h-4" />
          إضافة للسلة
        </Button>
      </CardFooter>
    </Card>
  );
}
