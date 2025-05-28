import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetails } from "@/components/products/ProductDetails";

interface ProductDetailsPageProps {
  params: { id: string };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  return <ProductDetails initialProduct={product} />;
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
} 