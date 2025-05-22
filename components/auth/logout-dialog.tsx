"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LogoutDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function LogoutDialog({ open, setOpen }: LogoutDialogProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Here you would typically clear any auth tokens, user data, etc.
    // For now, we'll just redirect to the login page
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? You will need to login again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 