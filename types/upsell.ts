export interface Upsell {
  id: string;
  name: string;
  product: string;
  upsellProduct: string;
  discount: string;
  status: "active" | "draft" | "archived";
  conversionRate: string;
  lastModified: string;
}