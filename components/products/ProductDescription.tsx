import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <Card className="p-8 rounded-2xl border-gray-100">
      <div className="text-xl font-semibold text-gray-900 mb-4">Product Description</div>
      <div className="text-gray-700 leading-relaxed">
        {product.description}
      </div>
    </Card>
  );
} 