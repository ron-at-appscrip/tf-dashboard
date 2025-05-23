import { Card } from "@/components/ui/card";

interface Bundle {
  name: string;
  sku: string;
  description: string;
  type: string[];
  products: { name: string; qty: number; price: number; main: boolean }[];
  msrp: number;
  bundlePrice: number;
  customerSaves: number;
  date: string;
  slug: string;
}

export function BundlesGrid({ bundles }: { bundles: Bundle[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bundles.map((bundle, i) => (
        <BundleCard key={i} bundle={bundle} />
      ))}
    </div>
  );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Card className="p-6 rounded-2xl border-border hover:shadow-md transition-shadow bg-card flex flex-col gap-2 min-w-[340px]">
      <div className="flex gap-2 mb-2 flex-wrap">
        {bundle.type.map((t) => (
          <span
            key={t}
            className={`px-2 py-1 flex items-center justify-center rounded text-xs font-semibold uppercase ${
              t === "main"
                ? "bg-green-100 text-green-700"
                : t === "upsell"
                ? "bg-yellow-100 text-yellow-700"
                : t === "active"
                ? "bg-green-50 text-green-700 border border-green-200"
                : t === "inactive"
                ? "bg-red-50 text-red-700 border border-red-200"
                : t === "storefront"
                ? "bg-purple-100 text-purple-700"
                : ""
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="font-bold text-lg leading-tight mb-1">{bundle.name}</div>
      <div className="text-xs text-muted-foreground mb-1">SKU: {bundle.sku}</div>
      <div className="text-sm text-muted-foreground mb-2">{bundle.description}</div>
      <div className="text-xs font-semibold mb-1">{bundle.products.length} PRODUCT{bundle.products.length > 1 ? "S" : ""}</div>
      <div className="flex flex-col gap-1 mb-2">
        {bundle.products.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-muted rounded px-2 py-1 text-xs"
          >
            <span className="bg-gray-100 rounded px-2 py-0.5 text-xs text-gray-700">
              {p.name}
            </span>
            <span className="text-muted-foreground">Qty: {p.qty} × ${p.price.toFixed(2)}</span>
            {p.main && <span className="text-[10px] ml-2 text-blue-600">Main Item</span>}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 bg-blue-50 rounded p-2 text-xs mb-2">
        <div className="flex justify-between">
          <span>MSRP Total:</span>
          <span>{bundle.msrp.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Bundle Price:</span>
          <span>{bundle.bundlePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Customer Saves:</span>
          <span className="text-green-600">{bundle.customerSaves.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2">
        <span className="flex items-center gap-1">
          <span role="img" aria-label="calendar">📅</span> {bundle.date}
        </span>
        <span className="flex items-center gap-1">
          <span role="img" aria-label="slug">🔗</span> {bundle.slug}
        </span>
      </div>
    </Card>
  );
} 