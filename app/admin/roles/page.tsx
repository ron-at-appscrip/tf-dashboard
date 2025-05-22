"use client"

import { useState } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { roleColumns, Role } from "@/components/dashboard/roles/columns";
import { AddRoleDialog } from "@/components/dashboard/roles/add-role-dialog";
import { ConfirmDialog } from "@/components/dashboard/roles/confirm-dialog";
import { EditRoleDialog } from "@/components/dashboard/roles/edit-role-dialog";
import { usersData } from "@/data/users";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";

// Role colors matching the users data
const roleColors = {
  admin: "bg-purple-100 text-purple-700",
  "vendor admin": "bg-blue-100 text-blue-700",
  "campaign manager": "bg-green-100 text-green-700",
  "content editor": "bg-yellow-100 text-yellow-700",
  analyst: "bg-gray-100 text-gray-700",
  default: "bg-gray-100 text-gray-700",
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(() => 
    Array.from(new Set(usersData.map((user: User) => user.role))).map(role => ({
      name: role,
      description: `Users with ${role} role`,
      users: usersData.filter((user: User) => user.role === role).length,
      color: roleColors[role.toLowerCase() as keyof typeof roleColors] || roleColors.default
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteRole = () => {
    if (selectedRole) {
      setRoles(prevRoles => prevRoles.filter(role => role.name !== selectedRole.name));
      setShowDeleteDialog(false);
      setSelectedRole(null);
    }
  };

  const handleSaveRole = (updatedRole: { name: string; description: string }) => {
    if (selectedRole) {
      // Update existing role
      setRoles(prevRoles => 
        prevRoles.map(role => 
          role.name === selectedRole.name 
            ? { ...role, name: updatedRole.name, description: updatedRole.description }
            : role
        )
      );
    } else {
      // Add new role at the beginning of the array
      const newRole: Role = {
        name: updatedRole.name,
        description: updatedRole.description,
        users: 0,
        color: roleColors[updatedRole.name.toLowerCase() as keyof typeof roleColors] || roleColors.default
      };
      setRoles(prevRoles => [newRole, ...prevRoles]);
    }
    setShowEditDialog(false);
    setSelectedRole(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>
                  Manage user roles and their permissions
                </CardDescription>
              </div>
              <Button onClick={() => {
                setSelectedRole(null);
                setShowEditDialog(true);
              }}>
                <PlusCircle className="mr-2 h-4 w-4" />
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
          </CardHeader>
          <CardContent>
            <DataTable
              columns={roleColumns({
                onEdit: (role) => {
                  setSelectedRole(role);
                  setShowEditDialog(true);
                },
                onDelete: (role) => {
                  setSelectedRole(role);
                  setShowDeleteDialog(true);
                },
              })}
              data={filteredRoles}
            />
          </CardContent>
        </Card>
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