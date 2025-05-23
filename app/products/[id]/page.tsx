import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductHeader } from "@/components/products/ProductHeader";
import { ProductImage } from "@/components/products/ProductImage";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductDescription } from "@/components/products/ProductDescription";
import { ProductMetadata } from "@/components/products/ProductMetadata";
import { ProductBundles } from "@/components/products/ProductBundles";
import { ProductShippingInfo } from "@/components/products/ProductShippingInfo";

interface ProductDetailsPageProps {
  params: { id: string };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

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
      <ProductShippingInfo />

      <ProductBundles bundles={bundles} />
    </div>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
} 