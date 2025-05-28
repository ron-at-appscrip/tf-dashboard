export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  lastUpdated: string;
  description: string;
  images: string[];
  source: "sticky" | "tfmnative" | "others";
  displayCategory: "on sale" | "display only" | "others";
  
  // Marketing & Content Fields
  marketing_headline?: string;
  marketing_description?: string;
  feature_bullets?: string[];
  usage_instructions?: string;
  
  // SEO Management Fields
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  meta_robots?: string;
  canonical_url?: string;
  
  // Display & Merchandising
  display_order?: number;
  is_featured?: boolean;
  featured_from?: string;
  featured_until?: string;
  visibility?: "visible" | "hidden" | "catalog_only";
  
  // Search & Discovery
  search_keywords?: string[];
  search_synonyms?: string[];
  search_boost?: number;
  tags?: string[];
  
  // Inventory Management Overrides
  low_stock_threshold?: number;
  backorder_allowed?: boolean;
  min_quantity?: number;
  max_quantity?: number;
  quantity_step?: number;
  
  // Content Management
  internal_notes?: string;
  admin_tags?: string[];
  content_status?: "draft" | "reviewed" | "approved";
  
  // Local Pricing Overrides
  local_price_override?: boolean;
  local_regular_price?: number;
  local_sale_price?: number;
  local_price_note?: string;
  
  // Enhanced Marketing
  cross_sell_products?: string[];
  upsell_products?: string[];
  marketing_badges?: string[];
  seasonal_availability?: Record<string, any>;
  
  // Customer Experience
  size_guide_url?: string;
  care_instructions?: string;
  warranty_info?: string;
  return_policy_override?: string;
  
  // Local Operations
  local_shipping_class?: string;
  handling_time_days?: number;
  requires_age_verification?: boolean;
  hazmat_shipping?: boolean;
  
  // Performance Tracking
  manual_popularity_boost?: number;
  hide_from_search?: boolean;
  exclude_from_feeds?: boolean;
  
  // Custom Attributes for Variants
  custom_variant_labels?: Record<string, any>;
  variant_display_type?: "dropdown" | "swatches" | "buttons";
  
  variants?: {
    id: string;
    name: string;
    price: string;
    stock: number;
    status: "in-stock" | "low-stock" | "out-of-stock";
    attributes: {
      [key: string]: string;
    };
  }[];
}