import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";

interface ProductMetadataProps {
  product: Product;
}

export function ProductMetadata({ product }: ProductMetadataProps) {
  return (
    <Card className="p-6 rounded-2xl border-border">
      <div className="text-lg font-semibold text-card-foreground mb-4">Product Metadata</div>
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Created</span>
          <span className="font-medium text-card-foreground">{product.lastUpdated}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Last Updated</span>
          <span className="font-medium text-card-foreground">{product.lastUpdated}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Category</span>
          <span className="font-medium text-card-foreground">{product.category}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted-foreground">Status</span>
          <span className="font-medium text-green-600">{product.status}</span>
        </div>
      </div>
    </Card>
  );
} 