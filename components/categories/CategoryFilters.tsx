import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface CategoryFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  source: string;
  setSource: (val: string) => void;
}

export function CategoryFilters({ search, setSearch, status, setStatus, source, setSource }: CategoryFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center bg-background rounded-xl p-4 shadow">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories..."
          className="pl-8"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Select value={source} onValueChange={setSource}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Sources" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="sticky">Sticky</SelectItem>
          <SelectItem value="tfm">TFM</SelectItem>
          <SelectItem value="others">Others</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 