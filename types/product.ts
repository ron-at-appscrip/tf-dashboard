export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  lastUpdated: string;
  description: string;
  images: string[];
}