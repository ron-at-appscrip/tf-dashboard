import { Card } from "@/components/ui/card";

interface Bundle {
  name: string;
  type: "main" | "upsell";
  price: string;
}

interface ProductBundlesProps {
  bundles: Bundle[];
  title?: string;
}

export function ProductBundles({ bundles , title}: ProductBundlesProps) {
  return (
    <div className="mb-8">
      <div className="text-xl font-semibold text-card-foreground mb-4">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bundles.map((bundle, i) => (
          <Card key={i} className="p-6 rounded-2xl border-border hover:shadow-md transition-shadow bg-card">
            <div className="flex gap-3 items-center mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                bundle.type === "main"
                  ? "bg-purple-200 text-purple-900 dark:bg-purple-900 dark:text-purple-200"
                  : "bg-green-200 text-green-900 dark:bg-green-900 dark:text-green-200"
              }`}>
                {bundle.type}
              </span>
              <span className="font-medium text-card-foreground">{bundle.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">Custom Price: {bundle.price}</div>
          </Card>
        ))}
      </div>
    </div>
  );
} 