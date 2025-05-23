import { Button } from "@/components/ui/button";

interface BundlesPaginationProps {
  page: number;
  setPage: (n: number) => void;
  totalPages: number;
}

export function BundlesPagination({ page, setPage, totalPages }: BundlesPaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex gap-2 justify-center items-center mt-4">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
} 