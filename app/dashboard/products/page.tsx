import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { productColumns } from "@/components/dashboard/products/columns";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500">
            Manage products for the Trulyfreehome storefront.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>
              Create and manage products for your Trulyfreehome storefront.
            </CardDescription>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline">Filter</Button>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={productColumns} data={products} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}