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
  source: "sticky" | "tfmnative" | "others";
  displayCategory: "on sale" | "display only" | "others";
  variants?: {
    id: string;
    name: string;
    price: string;
    stock: number;
    status: "in-stock" | "low-stock" | "out-of-stock";
    attributes: {
      [key: string]: string;
    };
  }[];
}