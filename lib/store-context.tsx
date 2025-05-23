"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Store {
  id: string;
  name: string;
  description: string;
  isSuperAdmin: boolean;
}

interface StoreContextType {
  currentStore: Store | null;
  setCurrentStore: (store: Store) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentStore, setCurrentStore] = useState<Store | null>(null);

  return (
    <StoreContext.Provider value={{ currentStore, setCurrentStore }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
} 