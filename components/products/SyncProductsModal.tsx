import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface SyncProductsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSync?: (params: { source: string; mode: string; productId?: string; projectId?: string }) => Promise<void>;
}

export function SyncProductsModal({ open, onOpenChange, onSync }: SyncProductsModalProps) {
  const [source, setSource] = useState("sticky");
  const [mode, setMode] = useState<"product" | "project">("product");
  const [productId, setProductId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset mode and fields when source changes
  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(e.target.value);
    setMode("product");
    setProductId("");
    setProjectId("");
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as "product" | "project");
    setProductId("");
    setProjectId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (onSync) {
        await onSync({ source, mode, productId: mode === "product" ? productId : undefined, projectId: mode === "project" ? projectId : undefined });
      } else {
        await new Promise((res) => setTimeout(res, 1500)); // fake loading
      }
      onOpenChange(false);
      setProductId("");
      setProjectId("");
    } catch (err) {
      setError("Failed to sync product(s). Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Sync Product{source === "sticky" && mode === "project" ? "s" : ""}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={source}
              onChange={handleSourceChange}
              disabled={loading}
            >
              <option value="sticky">Sticky</option>
              <option value="tfm">TFM</option>
            </select>
          </div>
          {source === "sticky" && (
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="sync-mode"
                  value="product"
                  checked={mode === "product"}
                  onChange={handleModeChange}
                  disabled={loading}
                />
                Sync by Product ID
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="sync-mode"
                  value="project"
                  checked={mode === "project"}
                  onChange={handleModeChange}
                  disabled={loading}
                />
                Sync ALL by Project ID
              </label>
            </div>
          )}
          {(source === "tfm" || (source === "sticky" && mode === "product")) && (
            <div>
              <label className="block text-sm font-medium mb-1">Product ID</label>
              <Input
                placeholder="Enter product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled={loading}
                required={mode === "product"}
              />
            </div>
          )}
          {source === "sticky" && mode === "project" && (
            <div>
              <label className="block text-sm font-medium mb-1">Project ID</label>
              <Input
                placeholder="Enter Sticky Project ID"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                disabled={loading}
                required={mode === "project"}
              />
            </div>
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || (source === "sticky" && mode === "product" && !productId) || (source === "sticky" && mode === "project" && !projectId) || (source === "tfm" && !productId)}
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
              Sync
            </Button>
          </DialogFooter>
        </form>
        {loading && (
          <div className="mt-4 animate-pulse h-4 bg-gray-200 rounded w-full" />
        )}
      </DialogContent>
    </Dialog>
  );
} 