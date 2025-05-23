import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <Card className="p-8 rounded-2xl border-border">
      <div className="text-xl font-semibold text-card-foreground mb-4">Product Description</div>
      <div className="text-muted-foreground leading-relaxed">
        {product.description}
      </div>
    </Card>
  );
} 