"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "./confirm-dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { defaultPermissionsGroups } from "./roles-permissions-data";
import type { User } from "@/types/user";

interface EditRoleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  role: { name: string; description: string } | null;
  onSave: (role: { name: string; description: string }) => void;
  onDelete: () => void;
  usersWithRole: User[];
}

export function EditRoleDialog({ open, setOpen, role, onSave, onDelete, usersWithRole }: EditRoleDialogProps) {
  const [editRole, setEditRole] = useState(role || { name: "", description: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  // Local permissions state for toggling
  const [permissions, setPermissions] = useState(() =>
    defaultPermissionsGroups.map(group => ({
      ...group,
      permissions: group.permissions.map(perm => ({ ...perm }))
    }))
  );

  // Update local state when role prop changes
  React.useEffect(() => {
    setEditRole(role || { name: "", description: "" });
  }, [role]);

  function togglePermission(groupIdx: number, permIdx: number) {
    setPermissions(perms =>
      perms.map((group, gIdx) =>
        gIdx === groupIdx
          ? {
              ...group,
              permissions: group.permissions.map((perm, pIdx) =>
                pIdx === permIdx ? { ...perm, enabled: !perm.enabled } : perm
              ),
            }
          : group
      )
    );
  }

  const isEditMode = !!role;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? `Edit Role: ${role?.name}` : "Add New Role"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role Name</label>
              <Input
                value={editRole.name}
                onChange={e => setEditRole(r => ({ ...r, name: e.target.value }))}
                placeholder="Role Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={editRole.description}
                onChange={e => setEditRole(r => ({ ...r, description: e.target.value }))}
                placeholder="Description"
              />
            </div>
            
            {isEditMode && (
              <>
                <div className="font-medium mb-1">Users with this role</div>
                <div className="text-xs text-muted-foreground mb-2">{usersWithRole.length} users currently have this role</div>
                <div className="space-y-2">
                  {usersWithRole.slice(0, showAllUsers ? undefined : 3).map(user => (
                    <div key={user.email} className="flex items-center gap-2 bg-muted rounded px-2 py-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold">
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  ))}
                  {usersWithRole.length > 3 && (
                    <div 
                      className="text-xs text-blue-600 cursor-pointer hover:text-blue-700"
                      onClick={() => setShowAllUsers(!showAllUsers)}
                    >
                      {showAllUsers ? "Show Less" : "View All"}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Button variant="destructive" className="w-full" onClick={() => setDeleteDialogOpen(true)}>
                    Delete Role
                  </Button>
                </div>
              </>
            )}
          </div>
          
          <div>
            {/* Permissions section with accordions and toggles */}
            <div className="mb-4">
              <Accordion type="single" collapsible defaultValue={permissions[0]?.key} className="w-full">
                {permissions.map((group, gIdx) => (
                  <AccordionItem value={group.key} key={group.key}>
                    <AccordionTrigger>{group.title}</AccordionTrigger>
                    <AccordionContent>
                      {group.permissions.length > 0 ? (
                        <div className="space-y-2">
                          {group.permissions.map((perm, pIdx) => (
                            <div key={perm.label} className="flex items-center justify-between p-2 rounded hover:bg-accent">
                              <div>
                                <div className="font-medium">{perm.label}</div>
                                <div className="text-xs text-muted-foreground">{perm.description}</div>
                              </div>
                              <Switch checked={perm.enabled} onCheckedChange={() => togglePermission(gIdx, pIdx)} />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => onSave(editRole)}>
            {isEditMode ? "Save Changes" : "Add Role"}
          </Button>
        </DialogFooter>
        
        {isEditMode && (
          <ConfirmDialog
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            title="Delete Role"
            description="Are you sure you want to delete this role? This action cannot be undone."
            onConfirm={onDelete}
            confirmText="Delete"
            cancelText="Cancel"
          />
        )}
      </DialogContent>
    </Dialog>
  );
} 