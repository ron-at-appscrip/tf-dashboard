"use client";

import React, { createContext, useContext, useState } from "react";
import { Store } from "@/types/store";
import { stores as initialStores } from "@/data/stores";

interface StoreContextType {
  stores: Store[];
  addStore: (store: Store) => void;
  updateStore: (store: Store) => void;
  deleteStore: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [stores, setStores] = useState<Store[]>(initialStores);

  const addStore = (store: Store) => {
    setStores((prevStores) => [...prevStores, store]);
  };

  const updateStore = (store: Store) => {
    setStores((prevStores) =>
      prevStores.map((s) => (s.id === store.id ? store : s))
    );
  };

  const deleteStore = (id: string) => {
    setStores((prevStores) => prevStores.filter((s) => s.id !== id));
  };

  return (
    <StoreContext.Provider value={{ stores, addStore, updateStore, deleteStore }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStores() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStores must be used within a StoreProvider");
  }
  return context;
} 