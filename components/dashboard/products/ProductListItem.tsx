import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  // Example discount and badge logic (customize as needed)
  const hasDiscount = product.price !== undefined && product.price !== null && parseFloat(product.price) < 20;
  const discount = hasDiscount ? 25 : 0; // Example logic
  const oldPrice = hasDiscount ? (parseFloat(product.price) / (1 - discount / 100)).toFixed(2) : null;
  const savings = hasDiscount ? (parseFloat(oldPrice!) - parseFloat(product.price)).toFixed(2) : null;

  return (
    <Card className="flex flex-row items-center gap-4 p-4 w-full shadow-md">
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded h-[80px] w-[80px] min-w-[80px]">
        {product.images && product.images[0] ? (
          <Image src={product.images[0]} alt={product.name} width={80} height={80} className="object-contain h-[60px] w-auto" />
        ) : (
          <span className="text-gray-400 text-xs">300 × 200</span>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex gap-2 mb-1">
          {discount > 0 && (
            <Badge variant="success" className="bg-green-100 text-green-700">-{discount}%</Badge>
          )}
          <Badge variant="outline" className="bg-blue-100 text-blue-700">{product.source}</Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-700">{product.displayCategory}</Badge>
        </div>
        <div className="font-semibold text-base leading-tight">{product.name}</div>
        <div className="text-xs text-gray-500">SKU: {product.id}</div>
        <div className="text-sm text-gray-600 line-clamp-2">{product.description}</div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
          <span>Created: 5/15/2025</span>
          <span>Price: ${product.price}</span>
          <span>US Shipping: 2</span>
          <span>CA Shipping: 4</span>
        </div>
      </div>
      <div className="flex gap-2 min-w-[180px] items-end">
        <Link href={`/products/${product.id}`} passHref legacyBehavior>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
        <Button variant="outline" size="sm">Duplicate</Button>
        <Button variant="outline" size="sm">Sync</Button>
      </div>
    </Card>
  );
} 