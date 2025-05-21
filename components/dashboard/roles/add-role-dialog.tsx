"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Role } from "./columns";

interface AddRoleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  roles: Role[];
  onAddRole: (role: Role) => void;
}

export function AddRoleDialog({ open, setOpen, roles, onAddRole }: AddRoleDialogProps) {
  const [newRole, setNewRole] = useState({ name: "", description: "", clone: "" });

  function handleCreateRole() {
    if (!newRole.name.trim()) return;
    onAddRole({
      name: newRole.name,
      description: newRole.description,
      users: 0,
    });
    setOpen(false);
    setNewRole({ name: "", description: "", clone: "" });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role Name</label>
            <Input
              value={newRole.name}
              onChange={e => setNewRole(r => ({ ...r, name: e.target.value }))}
              placeholder="Enter role name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={newRole.description}
              onChange={e => setNewRole(r => ({ ...r, description: e.target.value }))}
              placeholder="Enter role description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Clone Permissions From</label>
            <Select
              value={newRole.clone}
              onValueChange={val => setNewRole(r => ({ ...r, clone: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role to clone from (optional)" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreateRole} disabled={!newRole.name.trim()}>
            Create Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 