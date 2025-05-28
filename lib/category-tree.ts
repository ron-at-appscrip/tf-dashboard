import type { Product } from "@/types/product";
import type { CategoryNode } from "@/components/categories/CategoryRow";

export function buildCategoryTree(products: Product[]): CategoryNode[] {
  const categories: CategoryNode[] = [
    {
      name: "Automotive Care",
      description: "Complete automotive care solutions for every vehicle",
      level: 0,
      tags: ["TFM"],
      stats: { products: 24, views: 1250, conversion: 4.85, level: 0 },
      children: [
        {
          name: "Car Fresheners",
          description: "Premium automotive air fresheners for lasting scent",
          level: 1,
          tags: ["STICKY"],
          stats: { products: 12, views: 890, conversion: 6.25, level: 1 },
          children: [
            {
              name: "Peppermint Fresheners",
              description: "Refreshing peppermint scented car fresheners",
              level: 2,
              tags: ["TFM"],
              stats: { products: 6, views: 245, conversion: 4.10, level: 2 },
            },
          ],
        },
      ],
    },
    // Add some non-nested categories
    {
      name: "Home Cleaning",
      description: "All-purpose and specialty cleaning products",
      level: 0,
      tags: ["TFM"],
      stats: { products: 18, views: 980, conversion: 5.12, level: 0 },
    },
    {
      name: "Kitchen Essentials",
      description: "Premium kitchen tools and accessories",
      level: 0,
      tags: ["STICKY"],
      stats: { products: 15, views: 760, conversion: 3.98, level: 0 },
    },
  ];
  return categories;
} 