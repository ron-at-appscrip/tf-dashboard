"use client";

import { StoreSelector } from "@/components/auth/store-selector";
import { useTranslation } from "@/lib/translations";
import { useLanguage } from "@/contexts/language-context";

export default function StoreSelectionPage() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">{t('store.selection.title')}</h1>
          <p className="text-gray-600 mt-1">
            {t('store.selection.subtitle')}
          </p>
        </div>
        <StoreSelector />
      </div>
    </div>
  );
}