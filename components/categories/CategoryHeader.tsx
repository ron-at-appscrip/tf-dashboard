import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface CategoryHeaderProps {
  syncing: boolean;
  setSyncing: (val: boolean) => void;
}

export function CategoryHeader({ syncing, setSyncing }: CategoryHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-background rounded-xl p-6 shadow">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground">Manage your product categories synced from external platforms</p>
      </div>
      <Button onClick={() => setSyncing(true)} disabled={syncing} variant="outline">
        <RefreshCcw className="w-4 h-4 mr-2" /> Sync All
      </Button>
    </div>
  );
} 