"use client";

import { StoreSelector } from "@/components/auth/store-selector";

export default function StoreSelectionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">Select Brand</h1>
          <p className="text-gray-600 mt-1">
            Choose which brand you want to manage
          </p>
        </div>
        <StoreSelector />
      </div>
    </div>
  );
}