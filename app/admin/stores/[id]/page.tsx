import { notFound } from "next/navigation";
import StoreDetails from "./store-details";
import { stores as initialStores } from "@/data/stores";

// This is required for static export
export async function generateStaticParams() {
  // For static export, we'll use initial stores
  // Dynamic stores will be handled client-side
  return initialStores.map((store) => ({
    id: store.id,
  }));
}

export default function StoreDetailsPage() {
  return <StoreDetails />;
}