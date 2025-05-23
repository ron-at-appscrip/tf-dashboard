import { Product } from "@/types/product";
import { SyncProductsModal } from "@/components/products/SyncProductsModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const products: Product[] = [
  {
    id: "p1",
    name: "Eco-Friendly All-Purpose Cleaner",
    category: "Cleaning",
    price: "12.99",
    stock: 145,
    status: "in-stock",
    lastUpdated: "2023-09-01",
    description: "Plant-based formula that effectively cleans without harsh chemicals.",
    source: "sticky",
    displayCategory: "on sale",
    images: [
      "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
  {
    id: "p2",
    name: "Premium Bamboo Cutting Board",
    category: "Kitchen",
    price: "34.95",
    stock: 78,
    status: "in-stock",
    lastUpdated: "2023-08-28",
    description: "Sustainable bamboo cutting board with juice groove and handle.",
    source: "tfmnative",
    displayCategory: "display only",
    images: [
      "https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
  {
    id: "p3",
    name: "Reusable Silicone Food Storage Bags",
    category: "Kitchen",
    price: "18.50",
    stock: 203,
    status: "in-stock",
    lastUpdated: "2023-08-25",
    description: "Set of 5 leak-proof silicone bags for food storage. Dishwasher safe.",
    source: "others",
    displayCategory: "on sale",
    images: [
      "https://images.pexels.com/photos/5378703/pexels-photo-5378703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
  {
    id: "p4",
    name: "Natural Wool Dryer Balls (6-Pack)",
    category: "Laundry",
    price: "21.99",
    stock: 92,
    status: "in-stock",
    lastUpdated: "2023-08-20",
    description: "Reduce drying time and static without chemicals. Lasts for 1000+ loads.",
    source: "sticky",
    displayCategory: "others",
    images: [
      "https://images.pexels.com/photos/7262888/pexels-photo-7262888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
  {
    id: "p5",
    name: "Stainless Steel Compost Bin",
    category: "Kitchen",
    price: "29.95",
    stock: 5,
    status: "low-stock",
    lastUpdated: "2023-08-15",
    description: "1.3-gallon kitchen compost bin with charcoal filter to prevent odors.",
    source: "tfmnative",
    displayCategory: "display only",
    images: [
      "https://images.pexels.com/photos/4039864/pexels-photo-4039864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
  {
    id: "p6",
    name: "Organic Cotton Bath Towel Set",
    category: "Bathroom",
    price: "45.00",
    stock: 0,
    status: "out-of-stock",
    lastUpdated: "2023-08-10",
    description: "Set of 4 ultra-soft, quick-drying towels made from 100% organic cotton.",
    source: "others",
    displayCategory: "on sale",
    images: [
      "https://images.pexels.com/photos/4210341/pexels-photo-4210341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
  {
    id: "p7",
    name: "Biodegradable Dish Soap",
    category: "Cleaning",
    price: "8.99",
    stock: 182,
    status: "in-stock",
    lastUpdated: "2023-08-05",
    description: "Plant-based formula that cuts through grease without harming aquatic life.",
    source: "sticky",
    displayCategory: "others",
    images: [
      "https://images.pexels.com/photos/5218019/pexels-photo-5218019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
  {
    id: "p8",
    name: "LED Energy-Saving Light Bulbs (4-Pack)",
    category: "Home",
    price: "15.95",
    stock: 3,
    status: "low-stock",
    lastUpdated: "2023-08-01",
    description: "9-watt LED bulbs equivalent to 60-watt incandescent. Lasts up to 15,000 hours.",
    source: "tfmnative",
    displayCategory: "display only",
    images: [
      "https://images.pexels.com/photos/3566345/pexels-photo-3566345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
];
