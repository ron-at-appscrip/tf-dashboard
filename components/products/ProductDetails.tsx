"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product";
import { ProductHeader } from "@/components/products/ProductHeader";
import { ProductImage } from "@/components/products/ProductImage";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductDescription } from "@/components/products/ProductDescription";
import { ProductMetadata } from "@/components/products/ProductMetadata";
import { ProductBundles } from "@/components/products/ProductBundles";
import { ProductShippingInfo } from "@/components/products/ProductShippingInfo";
import { ProductVariants } from "@/components/products/ProductVariants";
import { ProductEditableFields } from "@/components/products/ProductEditableFields";

interface ProductDetailsProps {
  initialProduct: Product;
}

export function ProductDetails({ initialProduct }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product>(initialProduct);

  const bundles = [
    {
      name: "Buy 1 MORE Get 3 MORE FREE Peppermint Space Freshener",
      type: "main" as const,
      price: "$19.99 × 4",
    },
    {
      name: "Eco-Friendly Cleaning Bundle",
      type: "upsell" as const,
      price: "$14.99 × 1",
    },
  ];

  const handleProductUpdate = (updates: Partial<Product>) => {
    setProduct(prev => ({
      ...prev,
      ...updates
    }));
    // TODO: Implement API call to save updates
    console.log('Product updates:', updates);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <Link href="/products" className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <ProductHeader product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ProductImage product={product} />
        <ProductInfo product={product} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ProductDescription product={product} />
        <ProductMetadata product={product} />
      </div>

     

      <div className="mb-8">
        <ProductVariants product={product} />
      </div>

      <ProductShippingInfo />
      <ProductBundles title="Used in Bundles" bundles={bundles} />
      <div className="mb-8">
        <ProductEditableFields 
          product={product} 
          onUpdate={handleProductUpdate}
          isStickyProduct={product.source === "sticky"}
        />
      </div>
    </div>
  );
} 