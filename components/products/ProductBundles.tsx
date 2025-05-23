import { Card } from "@/components/ui/card";

interface Bundle {
  name: string;
  type: "main" | "upsell";
  price: string;
}

interface ProductBundlesProps {
  bundles: Bundle[];
}

export function ProductBundles({ bundles }: ProductBundlesProps) {
  return (
    <div className="mb-8">
      <div className="text-xl font-semibold text-gray-900 mb-4">Used in Bundles</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bundles.map((bundle, i) => (
          <Card key={i} className="p-6 rounded-2xl border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex gap-3 items-center mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                bundle.type === "main" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
              }`}>
                {bundle.type}
              </span>
              <span className="font-medium text-gray-900">{bundle.name}</span>
            </div>
            <div className="text-sm text-gray-600">Custom Price: {bundle.price}</div>
          </Card>
        ))}
      </div>
    </div>
  );
} 