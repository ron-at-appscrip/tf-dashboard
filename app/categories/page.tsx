"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products as allProducts } from "@/data/products";
import { useState, useMemo } from "react";
import { ChevronDown, ChevronRight, Eye, Pencil, RefreshCcw, Search } from "lucide-react";
import { CategoryTree } from "@/components/categories/CategoryTree";
import { CategoryNode } from "@/components/categories/CategoryRow";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { CategoryFilters } from "@/components/categories/CategoryFilters";
import { buildCategoryTree } from "@/lib/category-tree";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CategoryEditableFields } from "@/components/categories/CategoryEditableFields";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const [syncing, setSyncing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryNode | null>(null);
  const categories = useMemo(() => buildCategoryTree(allProducts), []);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <CategoryHeader syncing={syncing} setSyncing={setSyncing} />
        <CategoryFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          source={source}
          setSource={setSource}
        />
        <div>
          <CategoryTree categories={categories} onEdit={setEditingCategory} />
        </div>
        <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
          <DialogContent>
            {editingCategory && (
              <CategoryEditableFields
                category={editingCategory}
                onUpdate={() => setEditingCategory(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
} 