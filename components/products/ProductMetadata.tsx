import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";

interface ProductMetadataProps {
  product: Product;
}

export function ProductMetadata({ product }: ProductMetadataProps) {
  return (
    <Card className="p-6 rounded-2xl border-gray-100">
      <div className="text-lg font-semibold text-gray-900 mb-4">Product Metadata</div>
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Created</span>
          <span className="font-medium text-gray-900">{product.lastUpdated}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Last Updated</span>
          <span className="font-medium text-gray-900">{product.lastUpdated}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Category</span>
          <span className="font-medium text-gray-900">{product.category}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Status</span>
          <span className="font-medium text-green-600">{product.status}</span>
        </div>
      </div>
    </Card>
  );
} 