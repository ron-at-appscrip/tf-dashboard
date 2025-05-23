import { Card } from "@/components/ui/card";

interface ShippingInfo {
  code: string;
  country: string;
  shippingId: number;
}

interface ProductShippingInfoProps {
  shipping?: ShippingInfo[];
}

const defaultShipping: ShippingInfo[] = [
  { code: "US", country: "United States", shippingId: 2 },
  { code: "CA", country: "Canada", shippingId: 4 },
];

export function ProductShippingInfo({ shipping = defaultShipping }: ProductShippingInfoProps) {
  return (
    <Card className="p-6 rounded-2xl border-gray-100 mb-8">
      <div className="text-lg font-semibold text-gray-900 mb-2">Shipping Information</div>
      <hr className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shipping.map((info) => (
          <div key={info.code} className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="text-xl font-bold mb-1">{info.code}</div>
            <div className="text-gray-700 mb-1">{info.country}</div>
            <div className="text-xs text-gray-500">Shipping ID: {info.shippingId}</div>
          </div>
        ))}
      </div>
    </Card>
  );
} 