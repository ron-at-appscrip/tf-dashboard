import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { funnelColumns } from "@/components/dashboard/funnels/columns";
import { funnels } from "@/data/funnels";

export default function FunnelsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Funnels</h1>
            <p className="text-muted-foreground">
              Create and manage your lead generation funnels.
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Funnel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Funnel Management</CardTitle>
            <CardDescription>
              Manage your sales and lead generation funnels.
            </CardDescription>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search funnels..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">View</Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={funnelColumns} data={funnels} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}