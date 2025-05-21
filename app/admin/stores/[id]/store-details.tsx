"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Store,
  Link as LinkIcon,
  Settings,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { useStores } from "@/contexts/store-context";

const StoreDetails: React.FC = () => {
  const params = useParams();
  const { stores } = useStores();
  const store = stores.find((s) => s.id === params.id);

  if (!store) {
    return <div>Store not found</div>;
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 flex-col items-start">
          <Link
            href="/admin/stores"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Stores
          </Link>
          <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{store.name}</h1>
            <p className="text-muted-foreground">{store.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/stores/${store.id}/edit`}>Edit Store</Link>
            </Button>
          </div>
          </div>
        </div>
     
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Basic store details and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  {store.logo_url ? (
                    <img
                      src={store.logo_url}
                      alt={store.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <Store className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{store.name}</h3>
                  <p className="text-sm text-muted-foreground">{store.slug}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={store.is_active ? "default" : "secondary"}>
                    {store.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Integration Type
                  </span>
                  <div className="flex gap-2">
                    {store.integration_type === "tfm" && (
                      <Badge variant="outline">TFM</Badge>
                    )}
                    {store.integration_type === "sticky" && (
                      <Badge variant="outline">Sticky.io</Badge>
                    )}
                    {store.integration_type === "both" && (
                      <>
                        <Badge variant="outline">TFM</Badge>
                        <Badge variant="outline">Sticky.io</Badge>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>
                    {format(new Date(store.created_at), "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Modified</span>
                  <span>
                    {format(new Date(store.updated_at), "dd MMM yyyy")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>
                Current connection status for integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(store.integration_type === "tfm" ||
                store.integration_type === "both") && (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">TFM Marketplace</div>
                      <div className="text-sm text-muted-foreground">
                        API Connection
                      </div>
                    </div>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              )}

              {(store.integration_type === "sticky" ||
                store.integration_type === "both") && (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Sticky.io</div>
                      <div className="text-sm text-muted-foreground">
                        API Connection
                      </div>
                    </div>
                  </div>
                  <Badge variant="destructive">Disconnected</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest events and updates for this store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      Integration settings updated
                    </div>
                    <div className="text-sm text-muted-foreground">
                      2 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      Store configuration changed
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Yesterday
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StoreDetails;
