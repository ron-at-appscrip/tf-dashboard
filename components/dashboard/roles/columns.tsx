"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export interface Role {
  name: string;
  description: string;
  users: number;
  color: string;
}

interface RoleActionsProps {
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export const roleColumns = ({ onEdit, onDelete }: RoleActionsProps): ColumnDef<Role>[] => [
  {
    accessorKey: "name",
    header: "Role Name",
    cell: ({ row }) => (
      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${row.original.color}`}>
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "users",
    header: "Users",
    cell: ({ row }) => `${row.original.users} users`,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(row.original)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(row.original)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]; 