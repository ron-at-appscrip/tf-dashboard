"use client"

import { AdminLayout } from "@/components/layout/admin-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash, MoreVertical, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { AddUserDialog } from "@/components/dashboard/users/add-user-dialog";
import { ConfirmDialog } from "@/components/dashboard/roles/confirm-dialog";

export type User = {
  initials: string;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  status: string;
  statusColor: string;
  storeAccess: string;
  storeCount: number;
  lastLogin: string;
};

export const usersData: User[] = [
  {
    initials: "JD",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    roleColor: "bg-purple-100 text-purple-700",
    status: "Active",
    statusColor: "text-green-600 bg-green-50",
    storeAccess: "All Stores",
    storeCount: 4,
    lastLogin: "2 hours ago",
  },
  {
    initials: "JS",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Vendor Admin",
    roleColor: "bg-blue-100 text-blue-700",
    status: "Active",
    statusColor: "text-green-600 bg-green-50",
    storeAccess: "3 Stores",
    storeCount: 3,
    lastLogin: "1 day ago",
  },
  {
    initials: "RJ",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Campaign Manager",
    roleColor: "bg-green-100 text-green-700",
    status: "Active",
    statusColor: "text-green-600 bg-green-50",
    storeAccess: "2 Stores",
    storeCount: 2,
    lastLogin: "5 days ago",
  },
  {
    initials: "ED",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Content Editor",
    roleColor: "bg-yellow-100 text-yellow-700",
    status: "Inactive",
    statusColor: "text-red-600 bg-red-50",
    storeAccess: "1 Store",
    storeCount: 1,
    lastLogin: "3 weeks ago",
  },
  {
    initials: "MB",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Analyst",
    roleColor: "bg-gray-100 text-gray-700",
    status: "Active",
    statusColor: "text-green-600 bg-green-50",
    storeAccess: "2 Stores",
    storeCount: 2,
    lastLogin: "6 hours ago",
  },
  { initials: "AL", name: "Alice Lee", email: "alice@example.com", role: "Admin", roleColor: "bg-purple-100 text-purple-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "All Stores", storeCount: 4, lastLogin: "4 hours ago" },
  { initials: "BW", name: "Brian White", email: "brian@example.com", role: "Vendor Admin", roleColor: "bg-blue-100 text-blue-700", status: "Inactive", statusColor: "text-red-600 bg-red-50", storeAccess: "2 Stores", storeCount: 2, lastLogin: "2 days ago" },
  { initials: "CS", name: "Cathy Sun", email: "cathy@example.com", role: "Campaign Manager", roleColor: "bg-green-100 text-green-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "1 Store", storeCount: 1, lastLogin: "1 week ago" },
  { initials: "DP", name: "David Park", email: "david@example.com", role: "Content Editor", roleColor: "bg-yellow-100 text-yellow-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "3 Stores", storeCount: 3, lastLogin: "2 weeks ago" },
  { initials: "ER", name: "Ella Reed", email: "ella@example.com", role: "Analyst", roleColor: "bg-gray-100 text-gray-700", status: "Inactive", statusColor: "text-red-600 bg-red-50", storeAccess: "2 Stores", storeCount: 2, lastLogin: "4 days ago" },
  { initials: "FS", name: "Frank Stone", email: "frank@example.com", role: "Admin", roleColor: "bg-purple-100 text-purple-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "All Stores", storeCount: 4, lastLogin: "8 hours ago" },
  { initials: "GH", name: "Grace Hall", email: "grace@example.com", role: "Vendor Admin", roleColor: "bg-blue-100 text-blue-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "1 Store", storeCount: 1, lastLogin: "3 days ago" },
  { initials: "HM", name: "Henry Moore", email: "henry@example.com", role: "Campaign Manager", roleColor: "bg-green-100 text-green-700", status: "Inactive", statusColor: "text-red-600 bg-red-50", storeAccess: "2 Stores", storeCount: 2, lastLogin: "5 hours ago" },
  { initials: "IS", name: "Ivy Scott", email: "ivy@example.com", role: "Content Editor", roleColor: "bg-yellow-100 text-yellow-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "3 Stores", storeCount: 3, lastLogin: "2 days ago" },
  { initials: "JT", name: "Jack Turner", email: "jack@example.com", role: "Analyst", roleColor: "bg-gray-100 text-gray-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "2 Stores", storeCount: 2, lastLogin: "1 hour ago" },
  { initials: "KL", name: "Karen Lee", email: "karen@example.com", role: "Admin", roleColor: "bg-purple-100 text-purple-700", status: "Inactive", statusColor: "text-red-600 bg-red-50", storeAccess: "All Stores", storeCount: 4, lastLogin: "1 month ago" },
  { initials: "LM", name: "Liam Miller", email: "liam@example.com", role: "Vendor Admin", roleColor: "bg-blue-100 text-blue-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "2 Stores", storeCount: 2, lastLogin: "2 weeks ago" },
  { initials: "MN", name: "Mia Nelson", email: "mia@example.com", role: "Campaign Manager", roleColor: "bg-green-100 text-green-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "1 Store", storeCount: 1, lastLogin: "3 days ago" },
  { initials: "OS", name: "Oscar Smith", email: "oscar@example.com", role: "Content Editor", roleColor: "bg-yellow-100 text-yellow-700", status: "Inactive", statusColor: "text-red-600 bg-red-50", storeAccess: "3 Stores", storeCount: 3, lastLogin: "4 weeks ago" },
  { initials: "PL", name: "Paula Lee", email: "paula@example.com", role: "Analyst", roleColor: "bg-gray-100 text-gray-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "2 Stores", storeCount: 2, lastLogin: "2 hours ago" },
  { initials: "QR", name: "Quinn Reed", email: "quinn@example.com", role: "Admin", roleColor: "bg-purple-100 text-purple-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "All Stores", storeCount: 4, lastLogin: "5 hours ago" },
  { initials: "RS", name: "Rita Stone", email: "rita@example.com", role: "Vendor Admin", roleColor: "bg-blue-100 text-blue-700", status: "Inactive", statusColor: "text-red-600 bg-red-50", storeAccess: "2 Stores", storeCount: 2, lastLogin: "2 days ago" },
  { initials: "ST", name: "Sam Taylor", email: "sam@example.com", role: "Campaign Manager", roleColor: "bg-green-100 text-green-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "1 Store", storeCount: 1, lastLogin: "1 week ago" },
  { initials: "UV", name: "Uma Vance", email: "uma@example.com", role: "Content Editor", roleColor: "bg-yellow-100 text-yellow-700", status: "Active", statusColor: "text-green-600 bg-green-50", storeAccess: "3 Stores", storeCount: 3, lastLogin: "2 days ago" },
  { initials: "WM", name: "Will Moore", email: "will@example.com", role: "Analyst", roleColor: "bg-gray-100 text-gray-700", status: "Inactive", statusColor: "text-red-600 bg-red-50", storeAccess: "2 Stores", storeCount: 2, lastLogin: "3 hours ago" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [users, setUsers] = useState(usersData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const filteredUsers = users.filter((user) =>
    (user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === "All Roles" || user.role === roleFilter) &&
    (statusFilter === "All status" || user.status === statusFilter)
  );

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / pageSize);
  const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  // Reset to page 1 if filters or pageSize change
  useEffect(() => { setPage(1); }, [search, roleFilter, statusFilter, pageSize]);

  function handleDeleteUser(email: string) {
    setUserToDelete(email);
    setDeleteDialogOpen(true);
  }

  function confirmDeleteUser() {
    if (userToDelete) {
      setUsers(users => users.filter(u => u.email !== userToDelete));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between mt-4 mb-2">
          <h1 className="text-xl font-semibold">Users</h1>
          <Button className="flex items-center gap-2" onClick={() => setAddUserOpen(true)}><Plus className="w-4 h-4" /> Add User</Button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users by name or email..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="min-w-[90px]">Filters</Button>
          <select
            className="border rounded px-3 py-2 text-sm min-w-[120px]"
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option>All Roles</option>
            <option>Admin</option>
            <option>Vendor Admin</option>
            <option>Campaign Manager</option>
            <option>Content Editor</option>
            <option>Analyst</option>
          </select>
          <select
            className="border rounded px-3 py-2 text-sm min-w-[90px]"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option>All status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          {(search || roleFilter !== "All Roles" || statusFilter !== "All status") && (
            <Button
              variant="ghost"
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={() => {
                setSearch("");
                setRoleFilter("All Roles");
                setStatusFilter("All status");
              }}
            >
              Clear Filters
            </Button>
          )}
         
        </div>
        <div className="overflow-x-auto bg-white rounded-lg border">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="text-left px-6 py-3 font-semibold">USER</th>
                <th className="text-left px-6 py-3 font-semibold">ROLE</th>
                <th className="text-left px-6 py-3 font-semibold">STATUS</th>
                <th className="text-left px-6 py-3 font-semibold">STORE ACCESS</th>
                <th className="text-left px-6 py-3 font-semibold">LAST LOGIN</th>
                <th className="text-left px-6 py-3 font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, idx) => (
                <tr key={user.email} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-3 flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-500 font-bold text-base">
                      {user.initials}
                    </span>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.roleColor}`}>{user.role}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${user.statusColor}`}>
                      {user.status === "Active" ? (
                        <>
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                          Active
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                          Inactive
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {user.storeAccess === "All Stores" ? (
                      <span className="flex items-center gap-1 text-purple-700"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v1M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10M9 21V10m6 11V10" /></svg>All Stores</span>
                    ) : (
                      <span className="text-gray-700">{user.storeCount} Stores</span>
                    )}
                  </td>
                  <td className="px-6 py-3">{user.lastLogin}</td>
                  <td className="px-6 pr-3 pl-[50px]">
                    <div className="flex gap-2 items-center">
                      <button className="text-red-600 hover:text-red-800" title="Delete" onClick={() => handleDeleteUser(user.email)}><Trash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            Showing {totalUsers === 0 ? 0 : (page - 1) * pageSize + 1}
            -{Math.min(page * pageSize, totalUsers)} of {totalUsers} users

             <select
            className="border rounded px-3 py-2 text-sm min-w-[40px]"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalUsers === 0}
            >
              Next
            </Button>
          </div>
        </div>
        <AddUserDialog
          open={addUserOpen}
          setOpen={setAddUserOpen}
          onAddUser={user => setUsers(prev => [user, ...prev])}
          roles={["Admin", "Vendor Admin", "Campaign Manager", "Content Editor", "Analyst"]}
        />
        <ConfirmDialog
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          title="Delete User"
          description={`Are you sure you want to delete this user? This action cannot be undone.`}
          onConfirm={confirmDeleteUser}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </AdminLayout>
  );
}