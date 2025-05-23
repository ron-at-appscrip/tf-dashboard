import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ProductImageProps {
  product: Product;
}

export function ProductImage({ product }: ProductImageProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border-border">
      <div className="flex items-center justify-center p-8 bg-muted">
        {product.images && product.images[0] ? (
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            width={500} 
            height={500} 
            className="object-contain w-full h-96" 
          />
        ) : (
          <div className="flex items-center justify-center w-full h-96 bg-muted text-muted-foreground text-3xl">
            500 × 500
          </div>
        )}
      </div>
      <div className="p-4 bg-card border-t border-border">
        <div className="text-xs text-muted-foreground">
          Product image from {product.source === "sticky" ? "Sticky" : product.source}
        </div>
      </div>
    </Card>
  );
} 