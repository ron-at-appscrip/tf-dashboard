import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductVariantsProps {
  product: Product;
  selectedVariantId?: string;
  onVariantSelect?: (variantId: string) => void;
}

export function ProductVariants({ product, selectedVariantId, onVariantSelect }: ProductVariantsProps) {
  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  // Group variants by their attributes
  const attributeGroups = product.variants.reduce((groups, variant) => {
    Object.entries(variant.attributes).forEach(([key, value]) => {
      if (!groups[key]) {
        groups[key] = new Set();
      }
      groups[key].add(value);
    });
    return groups;
  }, {} as Record<string, Set<string>>);

  return (
    <Card className="p-6 rounded-2xl border-border col-start-1 col-end-3">
      <div className="text-lg font-semibold text-card-foreground mb-4">Product Variants</div>
      
      {Object.entries(attributeGroups).map(([attribute, values]) => (
        <div key={attribute} className="mb-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block capitalize">
            {attribute}
          </Label>
          <RadioGroup
            value={selectedVariantId}
            onValueChange={onVariantSelect}
            className="flex flex-wrap gap-2"
          >
            {Array.from(values).map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`${attribute}-${value}`} />
                <Label htmlFor={`${attribute}-${value}`} className="text-sm">
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}

      <div className="mt-4 space-y-2">
        {product.variants.map((variant) => (
          <div
            key={variant.id}
            className={`p-3 rounded-lg border ${
              selectedVariantId === variant.id ? "border-primary" : "border-border"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{variant.name}</div>
                <div className="text-sm text-muted-foreground">
                  {Object.entries(variant.attributes)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${variant.price}</div>
                <Badge
                  variant={variant.status === "in-stock" ? "success" : "destructive"}
                  className="mt-1"
                >
                  {variant.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 