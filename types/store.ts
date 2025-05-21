export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  integration_type: "tfm" | "sticky" | "both";
  is_active: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}