"use client";

import { useRouter } from "next/navigation";
import { Home, Leaf, ShoppingBag, ChevronRight, Loader2, UserCog } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useStore } from "@/lib/store-context";
import { useTranslation } from "@/lib/translations";
import { useLanguage } from "@/contexts/language-context";

const storeConfigs = [
  {
    id: "superadmin",
    icon: UserCog,
    href: "/dashboard",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    isSuperAdmin: true,
  },
  {
    id: "trulyfreehome",
    icon: Home,
    href: "/dashboard",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    isSuperAdmin: false,
  },
  {
    id: "truself",
    icon: Leaf,
    href: "/dashboard",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    isSuperAdmin: false,
  },
  {
    id: "marketplace",
    icon: ShoppingBag,
    disabled: true,
    href: "/dashboard",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
    isSuperAdmin: false,
  },
];

export function StoreSelector() {
  const router = useRouter();
  const [loadingStore, setLoadingStore] = useState<string | null>(null);
  const { setCurrentStore } = useStore();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const handleStoreSelect = (store: typeof storeConfigs[0]) => {
    if (store.disabled) return;
    
    setLoadingStore(store.id);
    setCurrentStore({
      id: store.id,
      name: t(`store.selection.stores.${store.id}.name`),
      description: t(`store.selection.stores.${store.id}.description`),
      isSuperAdmin: store.isSuperAdmin,
    });
    router.push(store.href);
  };

  return (
    <div className="space-y-3">
      {storeConfigs.map((store) => (
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
                <h3 className="font-medium">
                  {t(`store.selection.stores.${store.id}.name`)}
                </h3>
                <p className="text-sm text-gray-500">
                  {t(`store.selection.stores.${store.id}.description`)}
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