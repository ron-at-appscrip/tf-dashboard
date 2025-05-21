export interface Funnel {
  id: string;
  name: string;
  type: string;
  status: "active" | "draft" | "archived";
  conversionRate: string;
  lastUpdated: string;
  steps: number;
  createdBy: string;
}