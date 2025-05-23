"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { storeColumns } from "@/components/dashboard/stores/columns";
import Link from "next/link";
import { useStores } from "@/contexts/store-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { StoreProvider } from "@/contexts/store-context";

function StoresPageInner() {
  const { stores } = useStores();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [integrationFilter, setIntegrationFilter] = useState("all-integration");

  const hasActiveFilters = searchQuery || statusFilter !== "all-status" || integrationFilter !== "all-integration";

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all-status");
    setIntegrationFilter("all-integration");
  };

  const filteredStores = stores.filter(store => {
    // Search filter
    const matchesSearch = 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (store.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = 
      statusFilter === "all-status" ||
      (statusFilter === "active" && store.is_active) ||
      (statusFilter === "inactive" && !store.is_active);

    // Integration filter
    const matchesIntegration = 
      integrationFilter === "all-integration" ||
      (integrationFilter === "tfm" && store.integration_type === "tfm") ||
      (integrationFilter === "sticky" && store.integration_type === "sticky") ||
      (integrationFilter === "both" && store.integration_type === "both");

    return matchesSearch && matchesStatus && matchesIntegration;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        

        <Card>
          <CardHeader className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Store Management</CardTitle>
                <CardDescription>
                  Manage your connected stores and integrations
                </CardDescription>
              </div>
              <Link href="/admin/stores/add">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Store
                </Button>
              </Link>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search stores..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={integrationFilter} onValueChange={setIntegrationFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Integration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-integration">All Integration</SelectItem>
                    <SelectItem value="tfm">TFM Only</SelectItem>
                    <SelectItem value="sticky">Sticky.io Only</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={storeColumns} data={filteredStores} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default function StoresPage() {
  return (
    <StoreProvider>
      <StoresPageInner />
    </StoreProvider>
  );
}