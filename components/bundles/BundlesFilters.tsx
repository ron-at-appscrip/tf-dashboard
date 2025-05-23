import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BundlesFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  visibility: string;
  setVisibility: (v: string) => void;
  pageSize: number;
  setPageSize: (v: number) => void;
  totalBundles: number;
  showingCount: number;
  pageSizeOptions: number[];
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "main", label: "Main" },
  { value: "upsell", label: "Upsell" },
];
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
const visibilityOptions = [
  { value: "all", label: "All Visibility" },
  { value: "storefront", label: "Storefront" },
];

export function BundlesFilters({
  search,
  setSearch,
  type,
  setType,
  status,
  setStatus,
  visibility,
  setVisibility,
  pageSize,
  setPageSize,
  totalBundles,
  showingCount,
  pageSizeOptions,
  hasActiveFilters,
  onClearFilters,
}: BundlesFiltersProps) {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bundles by name, SKU, or description..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={visibility} onValueChange={setVisibility}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Visibility" />
          </SelectTrigger>
          <SelectContent>
            {visibilityOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasActiveFilters && onClearFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters} className="ml-2 mt-2 md:mt-0">
            Clear Filters
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
        <span>Showing {showingCount} of {totalBundles} bundles</span>
        <Select value={String(pageSize)} onValueChange={v => setPageSize(Number(v))}>
          <SelectTrigger className="w-[80px] h-7 text-xs ml-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map(opt => (
              <SelectItem key={opt} value={String(opt)}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>per page</span>
      </div>
    </>
  );
} 