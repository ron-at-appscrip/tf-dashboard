"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, LayoutGrid, List } from "lucide-react";
import { products as allProducts } from "@/data/products";
import { ProductCard } from "@/components/dashboard/products/ProductCard";
import { ProductListItem } from "@/components/dashboard/products/ProductListItem";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SyncProductsModal } from "@/components/products/SyncProductsModal";

const PAGE_SIZE_OPTIONS = [4, 8, 12, 24];
const SOURCE_OPTIONS = [
  { value: "all", label: "All Sources" },
  { value: "sticky", label: "Sticky" },
  { value: "tfm-native", label: "TFM Native" },
  { value: "others", label: "Others" },
];
const PRODUCT_OPTIONS = [
  { value: "all", label: "All Products" },
  { value: "on-sale", label: "On Sale" },
  { value: "for-display", label: "For Display" },
  { value: "others", label: "Others" },
];

export default function ProductsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [syncModalOpen, setSyncModalOpen] = useState(false);

  // Filtering logic (customize as needed for your data)
  let filteredProducts = allProducts;

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  // Source filter (by category)
  if (sourceFilter !== "all") {
    filteredProducts = filteredProducts.filter(p => {
      if (sourceFilter === "sticky") return p.source === "sticky";
      if (sourceFilter === "tfm-native") return p.source === "tfmnative";
      if (sourceFilter === "others") return p.source === "others";
      return true;
    });
  }

  // Product filter (by price/status)
  if (productFilter !== "all") {
    filteredProducts = filteredProducts.filter(p => {
      if (productFilter === "on-sale") return p.displayCategory === "on sale";
      if (productFilter === "for-display") return p.displayCategory === "display only";
      if (productFilter === "others") return p.displayCategory === "others";
      return true;
    });
  }

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  const handleSourceFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceFilter(e.target.value);
    setPage(1);
  };

  const handleProductFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductFilter(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSourceFilter("all");
    setProductFilter("all");
    setSearchQuery("");
    setPage(1);
  };

  const hasActiveFilters = sourceFilter !== "all" || productFilter !== "all" || searchQuery !== "";

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header and actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-background rounded-xl p-6 shadow">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog and inventory</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Analytics</Button>
            <Button variant="outline">Export</Button>
            <Button onClick={() => setSyncModalOpen(true)}>Sync Products</Button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-2 items-center bg-background rounded-xl p-4 shadow">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products by name, SKU, or description..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <select
            className="border rounded px-3 py-2 text-sm text-foreground bg-background"
            value={sourceFilter}
            onChange={handleSourceFilterChange}
          >
            {SOURCE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm text-foreground bg-background"
            value={productFilter}
            onChange={handleProductFilterChange}
          >
            {PRODUCT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {hasActiveFilters && (
            <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
          )}
        </div>

        {/* Product count, page size, and view toggle */}
        <div className="flex items-center justify-between bg-background rounded-xl p-3 shadow">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Showing {paginatedProducts.length} of {totalProducts} products</span>
            <select
              className="border rounded px-2 py-1 text-sm text-foreground bg-background ml-2"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>{size} per page</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setView('grid')}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setView('list')}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product grid or list */}
        {view === 'grid' ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {paginatedProducts.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  aria-disabled={page === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    isActive={page === idx + 1}
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  aria-disabled={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <SyncProductsModal open={syncModalOpen} onOpenChange={setSyncModalOpen} />
    </AdminLayout>
  );
} 