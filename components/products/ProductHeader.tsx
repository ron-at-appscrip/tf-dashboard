import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, PlusCircle } from "lucide-react";

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="text-gray-500 text-sm mb-3">SKU: {product.id}</div>
          <div className="flex gap-2">
            <Badge variant="success" className="px-3 py-1">-25% OFF</Badge>
            <Badge variant="outline" className="px-3 py-1">
              {product.source === "sticky" ? "Sticky Product" : product.source}
            </Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync from Source
          </Button>
          <Button size="lg" className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Add to Bundle
          </Button>
        </div>
      </div>
    </div>
  );
} 