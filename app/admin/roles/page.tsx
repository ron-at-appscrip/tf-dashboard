"use client"

import { useState } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Trash, Edit } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { roleColumns, Role } from "@/components/dashboard/roles/columns";
import { AddRoleDialog } from "@/components/dashboard/roles/add-role-dialog";
import { DefaultPermissions } from "@/components/dashboard/roles/default-permissions";
import { rolesData } from "@/components/dashboard/roles/roles-data";
import { ConfirmDialog } from "@/components/dashboard/roles/confirm-dialog";
import { EditRoleDialog } from "@/components/dashboard/roles/edit-role-dialog";
import { usersData } from "@/data/users";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";

interface RoleData {
  name: string;
  description: string;
  users: number;
  color: string;
}

export default function RolesPage() {
  const [tab, setTab] = useState("roles");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);

  const roles: RoleData[] = Array.from(new Set(usersData.map((user: User) => user.role))).map(role => ({
    name: role,
    description: `Users with ${role} role`,
    users: usersData.filter((user: User) => user.role === role).length,
    color: usersData.find((user: User) => user.role === role)?.roleColor || "bg-gray-100 text-gray-700"
  }));

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteRole = () => {
    // Handle role deletion
    setShowDeleteDialog(false);
    setSelectedRole(null);
  };

  const handleSaveRole = (updatedRole: { name: string; description: string }) => {
    // Handle role update
    setShowEditDialog(false);
    setSelectedRole(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <Button onClick={() => setShowEditDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Role
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-500">
            <div className="col-span-6">Role Name</div>
            <div className="col-span-4">Users</div>
            <div className="col-span-2">Actions</div>
          </div>
          <div className="divide-y">
            {filteredRoles.map((role) => (
              <div key={role.name} className="grid grid-cols-12 gap-4 p-4 text-sm">
                <div className="col-span-6 flex items-center">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${role.color}`}>
                    {role.name}
                  </span>
                </div>
                <div className="col-span-4 flex items-center text-gray-500">
                  {role.users} users
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedRole(role);
                      setShowEditDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedRole(role);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditRoleDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        role={selectedRole}
        onSave={handleSaveRole}
        onDelete={handleDeleteRole}
        usersWithRole={selectedRole ? usersData.filter(user => user.role === selectedRole.name) : []}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        title="Delete Role"
        description="Are you sure you want to delete this role? This action cannot be undone."
        onConfirm={handleDeleteRole}
      />
    </AdminLayout>
  );
}