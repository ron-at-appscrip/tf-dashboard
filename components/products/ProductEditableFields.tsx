"use client";

import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProductEditableFieldsProps {
  product: Product;
  onUpdate: (updates: Partial<Product>) => void;
  isStickyProduct?: boolean;
}

export function ProductEditableFields({ product, onUpdate, isStickyProduct = false }: ProductEditableFieldsProps) {
  const [activeTab, setActiveTab] = useState("marketing");

  const handleFieldChange = (field: keyof Product, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleArrayFieldChange = (field: keyof Product, value: string) => {
    const currentValues = (product[field] as string[]) || [];
    const newValues = value.split(',').map(v => v.trim()).filter(Boolean);
    onUpdate({ [field]: newValues });
  };

  return (
    <Card className="p-6 rounded-2xl border-border">
      <div className="text-xl font-semibold text-card-foreground mb-6">Product Settings</div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Marketing Tab */}
        <TabsContent value="marketing" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="marketing_headline">Marketing Headline</Label>
              <Input
                id="marketing_headline"
                value={product.marketing_headline || ''}
                onChange={(e) => handleFieldChange('marketing_headline', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>
            
            <div>
              <Label htmlFor="marketing_description">Marketing Description</Label>
              <Textarea
                id="marketing_description"
                value={product.marketing_description || ''}
                onChange={(e) => handleFieldChange('marketing_description', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="feature_bullets">Feature Bullets (comma-separated)</Label>
              <Textarea
                id="feature_bullets"
                value={(product.feature_bullets || []).join(', ')}
                onChange={(e) => handleArrayFieldChange('feature_bullets', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="usage_instructions">Usage Instructions</Label>
              <Textarea
                id="usage_instructions"
                value={product.usage_instructions || ''}
                onChange={(e) => handleFieldChange('usage_instructions', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="marketing_badges">Marketing Badges (comma-separated)</Label>
              <Input
                id="marketing_badges"
                value={(product.marketing_badges || []).join(', ')}
                onChange={(e) => handleArrayFieldChange('marketing_badges', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="seo_title">SEO Title</Label>
              <Input
                id="seo_title"
                value={product.seo_title || ''}
                onChange={(e) => handleFieldChange('seo_title', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="seo_description">SEO Description</Label>
              <Textarea
                id="seo_description"
                value={product.seo_description || ''}
                onChange={(e) => handleFieldChange('seo_description', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="seo_keywords">SEO Keywords (comma-separated)</Label>
              <Input
                id="seo_keywords"
                value={(product.seo_keywords || []).join(', ')}
                onChange={(e) => handleArrayFieldChange('seo_keywords', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="meta_robots">Meta Robots</Label>
              <Input
                id="meta_robots"
                value={product.meta_robots || ''}
                onChange={(e) => handleFieldChange('meta_robots', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input
                id="canonical_url"
                value={product.canonical_url || ''}
                onChange={(e) => handleFieldChange('canonical_url', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>
          </div>
        </TabsContent>

        {/* Display Tab */}
        <TabsContent value="display" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={product.display_order || 0}
                onChange={(e) => handleFieldChange('display_order', parseInt(e.target.value))}
                disabled={isStickyProduct}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={product.is_featured || false}
                onCheckedChange={(checked) => handleFieldChange('is_featured', checked)}
                disabled={isStickyProduct}
              />
              <Label htmlFor="is_featured">Featured Product</Label>
            </div>

            <div>
              <Label htmlFor="visibility">Visibility</Label>
              <Select
                value={product.visibility || 'visible'}
                onValueChange={(value) => handleFieldChange('visibility', value)}
                disabled={isStickyProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visible">Visible</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                  <SelectItem value="catalog_only">Catalog Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="featured_from">Featured From</Label>
              <Input
                id="featured_from"
                type="datetime-local"
                value={product.featured_from || ''}
                onChange={(e) => handleFieldChange('featured_from', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="featured_until">Featured Until</Label>
              <Input
                id="featured_until"
                type="datetime-local"
                value={product.featured_until || ''}
                onChange={(e) => handleFieldChange('featured_until', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="low_stock_threshold">Low Stock Threshold</Label>
              <Input
                id="low_stock_threshold"
                type="number"
                value={product.low_stock_threshold || 0}
                onChange={(e) => handleFieldChange('low_stock_threshold', parseInt(e.target.value))}
                disabled={isStickyProduct}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="backorder_allowed"
                checked={product.backorder_allowed || false}
                onCheckedChange={(checked) => handleFieldChange('backorder_allowed', checked)}
                disabled={isStickyProduct}
              />
              <Label htmlFor="backorder_allowed">Allow Backorders</Label>
            </div>

            <div>
              <Label htmlFor="min_quantity">Minimum Quantity</Label>
              <Input
                id="min_quantity"
                type="number"
                value={product.min_quantity || 1}
                onChange={(e) => handleFieldChange('min_quantity', parseInt(e.target.value))}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="max_quantity">Maximum Quantity</Label>
              <Input
                id="max_quantity"
                type="number"
                value={product.max_quantity || 999}
                onChange={(e) => handleFieldChange('max_quantity', parseInt(e.target.value))}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="quantity_step">Quantity Step</Label>
              <Input
                id="quantity_step"
                type="number"
                value={product.quantity_step || 1}
                onChange={(e) => handleFieldChange('quantity_step', parseInt(e.target.value))}
                disabled={isStickyProduct}
              />
            </div>
          </div>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="internal_notes">Internal Notes</Label>
              <Textarea
                id="internal_notes"
                value={product.internal_notes || ''}
                onChange={(e) => handleFieldChange('internal_notes', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="admin_tags">Admin Tags (comma-separated)</Label>
              <Input
                id="admin_tags"
                value={(product.admin_tags || []).join(', ')}
                onChange={(e) => handleArrayFieldChange('admin_tags', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>

            <div>
              <Label htmlFor="content_status">Content Status</Label>
              <Select
                value={product.content_status || 'draft'}
                onValueChange={(value) => handleFieldChange('content_status', value)}
                disabled={isStickyProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="local_price_override"
                checked={product.local_price_override || false}
                onCheckedChange={(checked) => handleFieldChange('local_price_override', checked)}
                disabled={isStickyProduct}
              />
              <Label htmlFor="local_price_override">Enable Local Price Override</Label>
            </div>

            {product.local_price_override && (
              <>
                <div>
                  <Label htmlFor="local_regular_price">Local Regular Price</Label>
                  <Input
                    id="local_regular_price"
                    type="number"
                    step="0.01"
                    value={product.local_regular_price || ''}
                    onChange={(e) => handleFieldChange('local_regular_price', parseFloat(e.target.value))}
                    disabled={isStickyProduct}
                  />
                </div>

                <div>
                  <Label htmlFor="local_sale_price">Local Sale Price</Label>
                  <Input
                    id="local_sale_price"
                    type="number"
                    step="0.01"
                    value={product.local_sale_price || ''}
                    onChange={(e) => handleFieldChange('local_sale_price', parseFloat(e.target.value))}
                    disabled={isStickyProduct}
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="local_price_note">Price Override Note</Label>
              <Textarea
                id="local_price_note"
                value={product.local_price_note || ''}
                onChange={(e) => handleFieldChange('local_price_note', e.target.value)}
                disabled={isStickyProduct}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 