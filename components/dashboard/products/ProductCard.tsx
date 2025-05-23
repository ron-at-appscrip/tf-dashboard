import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Example discount and badge logic (customize as needed)
  const hasDiscount = product.price !== undefined && product.price !== null && parseFloat(product.price) < 20;
  const discount = hasDiscount ? 25 : 0; // Example logic
  const oldPrice = hasDiscount ? (parseFloat(product.price) / (1 - discount / 100)).toFixed(2) : null;
  const savings = hasDiscount ? (parseFloat(oldPrice!) - parseFloat(product.price)).toFixed(2) : null;

  return (
    <Link href={`/products/${product.id}`} className="block transition-shadow">
      <Card className="flex flex-col p-4 gap-2 min-w-[280px] max-w-xs w-full shadow-md cursor-pointer">
        <div className="flex gap-2 mb-2">
          {discount > 0 && (
            <Badge variant="success" className="bg-green-100 text-green-700">-{discount}%</Badge>
          )}
          <Badge variant="outline" className="bg-blue-100 text-blue-700">{product.source}</Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-700">{product.displayCategory}</Badge>
        </div>
        <div className="flex items-center justify-center bg-gray-100 rounded mb-2 h-[120px]">
          {product.images && product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} width={120} height={80} className="object-contain h-[80px] w-auto" />
          ) : (
            <span className="text-gray-400 text-lg">300 × 200</span>
          )}
        </div>
        <div className="font-semibold text-base leading-tight mb-1 line-clamp-1">{product.name}</div>
        <div className="text-xs text-gray-500 mb-1">SKU: {product.id}</div>
        <div className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {oldPrice && (
            <span className="text-sm line-through text-gray-400">${oldPrice}</span>
          )}
          {savings && (
            <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded">Save ${savings}</span>
          )}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <span>US: 2</span>
          <span>CA: 4</span>
          <span>5/15/2025</span>
        </div>
      </Card>
    </Link>
  );
} 