import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const price = parseFloat(product.price);
  const oldPrice = (price / 0.75).toFixed(2); // 25% discount
  const savings = (parseFloat(oldPrice) - price).toFixed(2);

  return (
    <Card className="p-8 rounded-2xl border-border">
      <div className="text-xl font-semibold text-card-foreground mb-6">Product Information</div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold text-green-600">${price.toFixed(2)}</span>
        <span className="text-lg text-muted-foreground line-through">${oldPrice}</span>
        <Badge variant="success" className="px-3 py-1">Save ${savings}</Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between py-3 border-b border-border">
          <span className="text-muted-foreground">Product Type</span>
          <span className="font-medium text-card-foreground">Physical Product</span>
        </div>
        <div className="flex justify-between py-3 border-b border-border">
          <span className="text-muted-foreground">Source System</span>
          <span className="font-medium text-card-foreground">
            {product.source === "sticky" ? "Sticky Platform" : product.source}
          </span>
        </div>
        <div className="flex justify-between py-3 border-b border-border">
          <span className="text-muted-foreground">External ID</span>
          <span className="font-medium text-card-foreground">{product.id}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-accent rounded-xl border border-accent">
        <div className="font-semibold text-blue-700 flex items-center gap-2 mb-2">
          <Circle className="w-5 h-5" fill="#3b82f6" />
          External Integration
        </div>
        <div className="space-y-1 text-sm text-blue-900">
          <div>Product synced from <span className="font-semibold">
            {product.source === "sticky" ? "Sticky Platform" : product.source}
          </span></div>
          <div>External ID: <span className="font-mono">{product.id}</span></div>
          <div>Last sync <span className="font-mono">{product.lastUpdated}</span></div>
        </div>
      </div>
    </Card>
  );
} 