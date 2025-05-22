"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddUserDialog } from "@/components/dashboard/users/add-user-dialog";
import { ConfirmDialog } from "@/components/dashboard/roles/confirm-dialog";
import { usersData } from "@/data/users";
import type { User } from "@/types/user";
import { DataTable } from "@/components/dashboard/data-table";
import { userColumns } from "@/components/dashboard/users/columns";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers((prev) =>
        prev.filter((user) => user.email !== selectedUser.email)
      );
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const handleEditUser = (user: User) => {
    // TODO: Implement edit user functionality
    console.log("Edit user:", user);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage connected users and their roles
                </CardDescription>
              </div>
              <Button onClick={() => setShowAddDialog(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={userColumns({
                onEdit: handleEditUser,
                onDelete: (user) => {
                  setSelectedUser(user);
                  setShowDeleteDialog(true);
                },
              })}
              data={filteredUsers}
            />
          </CardContent>
        </Card>
      </div>

      <AddUserDialog
        open={showAddDialog}
        setOpen={setShowAddDialog}
        onAddUser={handleAddUser}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDeleteUser}
      />
    </AdminLayout>
  );
}
