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

export default function StoresPage() {
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

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Stores Management</h1>
          <p className="text-muted-foreground">
            View and manage all stores connected to TFM Marketplace and Sticky.io
          </p>
        </div>

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
            <DataTable columns={storeColumns} data={stores} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}