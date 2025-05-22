"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";

interface UserActionsProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const userColumns = (actions: UserActionsProps): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${user.roleColor}`}>
            {user.initials}
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${user.roleColor}`}>
          {user.role}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${user.statusColor}`}>
          {user.status}
        </span>
      );
    },
  },
  {
    accessorKey: "storeAccess",
    header: "Store Access",
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => actions.onEdit(user)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => actions.onDelete(user)}
          >
            <Trash className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      );
    },
  },
]; 