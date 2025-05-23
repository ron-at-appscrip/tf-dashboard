"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const defaultStores = [
  "Main Store",
  "Fashion Outlet",
  "Electronics Hub",
  "Home Goods",
  "Sports Center",
  "Books & Media",
  "Grocery Mart",
  "Toy World",
  "Garden Supplies",
  "Pet Shop",
];

const defaultRoles = [
  "Admin",
  "Manager",
  "Editor",
  "Viewer",
  "Support"
];

type AddUserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddUser: (user: any) => void;
  roles?: string[];
  stores?: string[];
};

export function AddUserDialog({ open, setOpen, onAddUser, roles = defaultRoles, stores = defaultStores }: AddUserDialogProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [allStores, setAllStores] = useState(false);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [storeSearch, setStoreSearch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password] = useState(() => Math.random().toString(36).slice(-10));

  function handleStoreToggle(store: string) {
    setSelectedStores((prev) =>
      prev.includes(store) ? prev.filter((s) => s !== store) : [...prev, store]
    );
  }

  function handleSelectAllStores() {
    setSelectedStores(stores!);
  }
  function handleClearAllStores() {
    setSelectedStores([]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !email || !role) return;
    onAddUser({
      initials: fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2),
      name: fullName,
      email,
      role,
      roleColor: "bg-purple-100 text-purple-700", // You can map role to color if needed
      status: "Active",
      statusColor: "text-green-600 bg-green-50",
      storeAccess: allStores ? "All Stores" : `${selectedStores.length} Stores`,
      storeCount: allStores ? stores!.length : selectedStores.length,
      lastLogin: "Just now",
    });
    setOpen(false);
    setFullName("");
    setEmail("");
    setRole("");
    setAllStores(false);
    setSelectedStores([]);
    setStoreSearch("");
  }

  const filteredStores = stores!.filter(s => s.toLowerCase().includes(storeSearch.toLowerCase()));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter full name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" type="email" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select className="w-full border rounded px-3 py-2 text-sm" value={role} onChange={e => setRole(e.target.value)}>
              <option value="">Select a role</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium">Store Access</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">All Stores</span>
                <input type="checkbox" checked={allStores} onChange={e => setAllStores(e.target.checked)} />
              </div>
            </div>
            {!allStores && (
              <div className="border rounded p-2 bg-gray-50">
                <Input
                  value={storeSearch}
                  onChange={e => setStoreSearch(e.target.value)}
                  placeholder="Search stores..."
                  className="mb-2"
                />
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {filteredStores.map(store => (
                    <label key={store} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedStores.includes(store)}
                        onChange={() => handleStoreToggle(store)}
                      />
                      {store}
                    </label>
                  ))}
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>{selectedStores.length} of {stores!.length} stores selected</span>
                  <span>
                    <button type="button" className="text-blue-600 mr-2" onClick={handleSelectAllStores}>Select All</button>
                    <button type="button" className="text-blue-600" onClick={handleClearAllStores}>Clear All</button>
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!fullName || !email || !role}>Add User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 