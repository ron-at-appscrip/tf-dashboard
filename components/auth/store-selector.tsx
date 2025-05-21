"use client";

import { useRouter } from "next/navigation";
import { Home, Leaf, ShoppingBag, ChevronRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const stores = [
  {
    id: "trulyfreehome",
    name: "Trulyfreehome",
    description: "Home & cleaning products",
    icon: Home,
    href: "/dashboard",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "truself",
    name: "Truself Organics",
    description: "Organic personal care",
    icon: Leaf,
    href: "/dashboard",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: "marketplace",
    name: "TF Marketplace",
    description: "No access permissions",
    icon: ShoppingBag,
    disabled: true,
    href: "/dashboard",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
  },
];

export function StoreSelector() {
  const router = useRouter();
  const [loadingStore, setLoadingStore] = useState<string | null>(null);

  const handleStoreSelect = (store: typeof stores[0]) => {
    if (store.disabled) return;
    
    setLoadingStore(store.id);
    router.push(store.href);
  };

  return (
    <div className="space-y-3">
      {stores.map((store) => (
        <Card
          key={store.id}
          className={`p-4 transition-all ${
            store.disabled
              ? "opacity-60 cursor-not-allowed"
              : "hover:shadow-md cursor-pointer"
          }`}
          onClick={() => handleStoreSelect(store)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${store.iconBg}`}>
                <store.icon className={`h-5 w-5 ${store.iconColor}`} />
              </div>
              <div>
                <h3 className="font-medium">{store.name}</h3>
                <p className="text-sm text-gray-500">
                  {store.description}
                </p>
              </div>
            </div>
            {loadingStore === store.id ? (
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}