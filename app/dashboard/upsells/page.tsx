import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { upsellColumns } from "@/components/dashboard/upsells/columns";
import { upsells } from "@/data/upsells";

export default function UpsellsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Upsells</h1>
            <p className="text-muted-foreground">
              Configure product upsells for your e-commerce store.
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Upsell
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upsell Management</CardTitle>
            <CardDescription>
              Configure and manage product upsells for your e-commerce store.
            </CardDescription>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search upsells..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">View</Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={upsellColumns} data={upsells} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}