"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash, User, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Role = {
  name: string;
  description: string;
  users: number;
};

interface RoleActionsProps {
  onDelete: (roleName: string) => void;
  onEdit: (roleName: string) => void;
}

export const roleColumns = (actions: RoleActionsProps): ColumnDef<Role>[] => [
  {
    accessorKey: "name",
    header: "Role Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "users",
    header: "Users",
    cell: ({ row }) => (
      <span className="flex items-center gap-1">
        <User className="inline mr-1 text-gray-400 w-4 h-4" />
        {row.getValue("users")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="flex justify-center">Actions</div>,
    cell: ({ row }) => {
      const role = row.original;
      return (
        <div className="flex gap-3 justify-center items-center">
          <Button variant="ghost" size="icon" title="Edit" onClick={() => actions.onEdit(role.name)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Delete" onClick={() => actions.onDelete(role.name)}>
            <Trash className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      );
    },
  },
]; 