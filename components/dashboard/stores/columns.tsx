"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Store } from "@/types/store";
import { format } from "date-fns";
import Link from "next/link";
import { useStores } from "@/contexts/store-context";
import { useRouter } from "next/navigation";

// Create a separate component for the actions cell
function StoreActions({ store }: { store: Store }) {
  const { updateStore } = useStores();
  const router = useRouter();

  const handleToggleActive = () => {
    const updatedStore = {
      ...store,
      is_active: !store.is_active,
      updated_at: new Date().toISOString()
    };
    updateStore(updatedStore);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/stores/${store.id}`}>View details</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/stores/${store.id}/edit`}>Edit store</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>View API settings</DropdownMenuItem>
        <DropdownMenuItem>View analytics</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive"
          onClick={handleToggleActive}
        >
          {store.is_active ? "Deactivate store" : "Activate store"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const storeColumns: ColumnDef<Store>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const store = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {store.logo_url ? (
              <img src={store.logo_url} alt={store.name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <span className="text-lg font-semibold">{store.name[0]}</span>
            )}
          </div>
          <div>
            <div className="font-medium">{store.name}</div>
            <div className="text-sm text-muted-foreground">{store.description}</div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "integration_type",
    header: "Integration",
    cell: ({ row }) => {
      const type = row.getValue("integration_type") as string;
      return (
        <div className="flex gap-2">
          {type === "tfm" && <Badge variant="outline">TFM</Badge>}
          {type === "sticky" && <Badge variant="outline">Sticky.io</Badge>}
          {type === "both" && (
            <>
              <Badge variant="outline">TFM</Badge>
              <Badge variant="outline">Sticky.io</Badge>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "connection_status",
    header: "Connection Status",
    cell: ({ row }) => {
      const store = row.original;
      return (
        <div className="flex gap-2">
          {(store.integration_type === "tfm" || store.integration_type === "both") && (
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm">TFM</span>
            </div>
          )}
          {(store.integration_type === "sticky" || store.integration_type === "both") && (
            <div className="flex items-center gap-1">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm">Sticky</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Modified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(new Date(row.getValue("updated_at")), "dd MMM yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const store = row.original;
      return <StoreActions store={store} />;
    },
  },
];