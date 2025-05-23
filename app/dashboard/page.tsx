"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { useStore } from "@/lib/store-context";
import { Store, Users, Activity, BarChart3 } from "lucide-react";

const adminCards = [
  {
    title: "Total Stores",
    value: "12",
    change: "+2 from last month",
    icon: Store,
  },
  {
    title: "Active Users",
    value: "+573",
    change: "+201 since last month",
    icon: Users,
  },
  {
    title: "System Load",
    value: "24%",
    change: "+5% from last hour",
    icon: Activity,
  },
  {
    title: "API Requests",
    value: "+2350",
    change: "+180 from last hour",
    icon: BarChart3,
  },
];

const storeCards = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: BarChart3,
  },
  {
    title: "Active Products",
    value: "86",
    change: "+12.2% from last month",
    icon: Store,
  },
  {
    title: "Active Orders",
    value: "24",
    change: "+5% from last hour",
    icon: Activity,
  },
  {
    title: "Total Customers",
    value: "+2350",
    change: "+180 from last hour",
    icon: Users,
  },
];

export default function DashboardPage() {
  const { currentStore } = useStore();
  const cards = currentStore?.isSuperAdmin ? adminCards : storeCards;

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {currentStore?.isSuperAdmin ? "Super Admin Dashboard" : "Store Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            {currentStore?.isSuperAdmin 
              ? "Welcome to your TF-TFM Super Admin dashboard."
              : `Welcome to your ${currentStore?.name} dashboard.`
            }
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              value={card.value}
              change={card.change}
              icon={card.icon}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                {currentStore?.isSuperAdmin ? "System Overview" : "Store Overview"}
              </CardTitle>
              <CardDescription>
                {currentStore?.isSuperAdmin 
                  ? "Monitor system performance and activity"
                  : "Monitor your store's performance"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>
                {currentStore?.isSuperAdmin ? "Recent Activity" : "Recent Sales"}
              </CardTitle>
              <CardDescription>
                {currentStore?.isSuperAdmin 
                  ? "Latest system events and notifications"
                  : "Latest transactions and orders"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}