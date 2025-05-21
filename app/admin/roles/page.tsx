"use client"

import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { roleColumns, Role } from "@/components/dashboard/roles/columns";
import { useState, useEffect } from "react";
import { AddRoleDialog } from "@/components/dashboard/roles/add-role-dialog";
import { DefaultPermissions } from "@/components/dashboard/roles/default-permissions";
import { rolesData } from "@/components/dashboard/roles/roles-data";
import { ConfirmDialog } from "@/components/dashboard/roles/confirm-dialog";
import { EditRoleDialog } from "@/components/dashboard/roles/edit-role-dialog";
import { usersData, User } from "@/app/admin/users/page";

export default function UsersPage() {
  const [tab, setTab] = useState("roles");
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState<Role[]>(rolesData);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [users, setUsers] = useState<User[]>(usersData);

  // Get users with the selected role
  const getUsersWithRole = (roleName: string): User[] => {
    return users.filter(user => user.role === roleName);
  };

  // Update role user counts whenever users change
  useEffect(() => {
    setRoles(prevRoles => 
      prevRoles.map(role => ({
        ...role,
        users: users.filter(user => user.role === role.name).length
      }))
    );
  }, [users]);

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAddRole(role: Role) {
    setRoles([...roles, role]);
  }

  function handleDeleteRole(roleName: string) {
    setRoleToDelete(roleName);
    setDeleteDialogOpen(true);
  }

  function confirmDeleteRole() {
    if (roleToDelete) {
      // Update users to remove this role
      setUsers(users.map(user => 
        user.role === roleToDelete 
          ? { ...user, role: "No Role" } 
          : user
      ));
      setRoles(roles.filter(r => r.name !== roleToDelete));
      setRoleToDelete(null);
    }
  }

  function handleEditRole(roleName: string) {
    const role = roles.find(r => r.name === roleName) || null;
    setSelectedRole(role);
    setEditDialogOpen(true);
  }

  function handleSaveRole(updated: { name: string; description: string }) {
    if (!selectedRole) return;
    
    // Update users with the new role name if the role name changed
    if (updated.name !== selectedRole.name) {
      setUsers(users.map(user => 
        user.role === selectedRole.name 
          ? { ...user, role: updated.name } 
          : user
      ));
    }
    
    setRoles(roles.map(r => r.name === selectedRole.name ? { ...r, ...updated } : r));
    setEditDialogOpen(false);
    setSelectedRole(null);
  }

  function handleDeleteFromEdit() {
    if (selectedRole) {
      // Update users to remove this role
      setUsers(users.map(user => 
        user.role === selectedRole.name 
          ? { ...user, role: "No Role" } 
          : user
      ));
      setRoles(roles.filter(r => r.name !== selectedRole.name));
      setEditDialogOpen(false);
      setSelectedRole(null);
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
        </div>
        <div className="flex border-b mb-2">
          <button
            className={`px-4 py-2 -mb-px border-b-2 font-medium text-sm focus:outline-none ${
              tab === "roles"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setTab("roles")}
          >
            Roles
          </button>
          <button
            className={`px-4 py-2 -mb-px border-b-2 font-medium text-sm focus:outline-none ${
              tab === "default"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setTab("default")}
          >
            Default Permissions
          </button>
        </div>
        {tab === "roles" && (
          <Card>
            <CardHeader className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Role Management</CardTitle>
                  <CardDescription>
                    Manage user roles and permissions across the platform
                  </CardDescription>
                </div>
                <AddRoleDialog open={open} setOpen={setOpen} roles={roles} onAddRole={handleAddRole} />
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search roles..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={roleColumns({
                onDelete: handleDeleteRole,
                onEdit: handleEditRole,
              })} data={filteredRoles} />
            </CardContent>
          </Card>
        )}
        {tab === "default" && (
          <DefaultPermissions />
        )}
        <ConfirmDialog
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          title="Delete Role"
          description={`Are you sure you want to delete the role "${roleToDelete}"? This action cannot be undone.`}
          onConfirm={confirmDeleteRole}
          confirmText="Delete"
          cancelText="Cancel"
        />
        <EditRoleDialog
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          role={selectedRole}
          onSave={handleSaveRole}
          onDelete={handleDeleteFromEdit}
          usersWithRole={selectedRole ? getUsersWithRole(selectedRole.name) : []}
        />
      </div>
    </AdminLayout>
  );
}