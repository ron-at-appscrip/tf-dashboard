"use client"
import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Product;
  selectedVariantId?: string;
  onVariantSelect?: (variantId: string) => void;
}

export function ProductInfo({ product, selectedVariantId, onVariantSelect }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find(v => v.id === selectedVariantId) || product.variants?.[0]
  );

  const price = selectedVariant ? parseFloat(selectedVariant.price) : parseFloat(product.price);
  const oldPrice = (price / 0.75).toFixed(2); // 25% discount
  const savings = (parseFloat(oldPrice) - price).toFixed(2);

  const handleVariantSelect = (variantId: string) => {
    const variant = product.variants?.find(v => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
      onVariantSelect?.(variantId);
    }
  };

  return (
    <Card className="p-8 flex flex-col gap-4 rounded-2xl border-border">
      <div className="text-xl font-semibold text-card-foreground mb-6">Product Information</div>
      
      {/* Price Section */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold text-green-600">${price.toFixed(2)}</span>
        <span className="text-lg text-muted-foreground line-through">${oldPrice}</span>
        <Badge variant="success" className="px-3 py-1">Save ${savings}</Badge>
      </div>

      {/* Selected Variant Info */}
      {selectedVariant && (
        <div className="mb-6 p-4 bg-accent/10 rounded-xl border border-accent">
          <div className="font-medium text-card-foreground mb-2">Selected Variant</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{selectedVariant.name}</span>
            </div>
            {Object.entries(selectedVariant.attributes).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stock</span>
              <span className="font-medium">{selectedVariant.stock} units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant={selectedVariant.status === "in-stock" ? "success" : "destructive"}
                className="px-2 py-0.5"
              >
                {selectedVariant.status}
              </Badge>
            </div>
          </div>
        </div>
      )}
      
      {/* Product Details */}
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

      {/* External Integration Info */}
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