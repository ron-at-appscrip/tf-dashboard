"use client";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { bundles as allBundles } from "@/data/bundles";
import React, { useState } from "react";
import { BundlesFilters } from "@/components/bundles/BundlesFilters";
import { BundlesGrid } from "@/components/bundles/BundlesGrid";
import { BundlesPagination } from "@/components/bundles/BundlesPagination";
import { PlusCircle, ChartArea, Download } from "lucide-react";

const pageSizeOptions = [5, 10, 20, 50];

export default function BundlesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [visibility, setVisibility] = useState("all");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  // Filtering logic
  let filteredBundles = allBundles.filter((bundle) => {
    // Search
    const query = search.toLowerCase();
    const matchesSearch =
      bundle.name.toLowerCase().includes(query) ||
      bundle.sku.toLowerCase().includes(query) ||
      bundle.description.toLowerCase().includes(query);
    // Type
    const matchesType = type === "all" || bundle.type.includes(type);
    // Status
    const matchesStatus = status === "all" || bundle.type.includes(status);
    // Visibility
    const matchesVisibility = visibility === "all" || bundle.type.includes(visibility);
    return matchesSearch && matchesType && matchesStatus && matchesVisibility;
  });

  const totalBundles = filteredBundles.length;
  const totalPages = Math.ceil(totalBundles / pageSize);
  const paginatedBundles = filteredBundles.slice((page - 1) * pageSize, page * pageSize);

  // Reset to page 1 if filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, type, status, visibility, pageSize]);

  const hasActiveFilters =
    !!search || type !== "all" || status !== "all" || visibility !== "all";

  const handleClearFilters = () => {
    setSearch("");
    setType("all");
    setStatus("all");
    setVisibility("all");
    setPage(1);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8 px-2 sm:px-6 lg:px-8 bg-background flex flex-col gap-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Bundles</h1>
            <p className="text-muted-foreground">Manage your product bundles and offers</p>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button variant="outline">
              <ChartArea className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Bundle
            </Button>
          </div>
        </div>
        {/* Filters */}
        <BundlesFilters
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          status={status}
          setStatus={setStatus}
          visibility={visibility}
          setVisibility={setVisibility}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalBundles={totalBundles}
          showingCount={paginatedBundles.length}
          pageSizeOptions={pageSizeOptions}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
        {/* Bundles grid */}
        <BundlesGrid bundles={paginatedBundles} />
        {/* Pagination controls */}
        <BundlesPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </AdminLayout>
  );
} 