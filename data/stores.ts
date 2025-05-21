import { Store } from "@/types/store";

export const stores: Store[] = [
  {
    id: "1",
    name: "Trulyfreehome",
    slug: "trulyfreehome",
    description: "Home & cleaning products store",
    logo_url: null,
    integration_type: "tfm",
    is_active: true,
    metadata: {},
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Truself Organics",
    slug: "truself-organics",
    description: "Organic personal care products",
    logo_url: null,
    integration_type: "sticky",
    is_active: true,
    metadata: {},
    created_at: "2025-01-02T00:00:00Z",
    updated_at: "2025-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "TF Marketplace",
    slug: "tf-marketplace",
    description: "Multi-vendor marketplace",
    logo_url: null,
    integration_type: "both",
    is_active: false,
    metadata: {},
    created_at: "2025-01-03T00:00:00Z",
    updated_at: "2025-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Eco Essentials",
    slug: "eco-essentials",
    description: "Sustainable living products",
    logo_url: null,
    integration_type: "both",
    is_active: true,
    metadata: {
      tfm: {
        vendor_id: "ECO123",
        api_key: "tfm_api_key_4",
        api_secret: "tfm_api_secret_4",
        webhook_secret: "tfm_webhook_secret_4",
        api_endpoint: "https://api.tfmarketplace.com/v1"
      },
      sticky: {
        account_id: "STK456",
        username: "eco_essentials",
        password: "sticky_password_4",
        webhook_secret: "sticky_webhook_secret_4",
        api_endpoint: "https://api.sticky.io/api"
      }
    },
    created_at: "2025-01-04T00:00:00Z",
    updated_at: "2025-01-04T00:00:00Z",
  }
];