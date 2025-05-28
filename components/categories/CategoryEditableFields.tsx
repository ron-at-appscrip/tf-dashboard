import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export interface CategoryEditableFieldsProps {
  category: any; // Replace with your Category type
  onUpdate: (updates: Partial<any>) => void;
}

export function CategoryEditableFields({ category, onUpdate }: CategoryEditableFieldsProps) {
  const [activeTab, setActiveTab] = useState("marketing");

  const handleFieldChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  return (
    <Card className="p-6 rounded-2xl border-border">
      <div className="text-xl font-semibold text-card-foreground mb-6">Category Settings</div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="additional">Additional</TabsTrigger>
        </TabsList>

        {/* Marketing Tab */}
        <TabsContent value="marketing" className="space-y-4">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={category.headline || ""}
              onChange={e => handleFieldChange("headline", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={category.description || ""}
              onChange={e => handleFieldChange("description", e.target.value)}
            />
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <div>
            <Label htmlFor="seo_title">SEO Title</Label>
            <Input
              id="seo_title"
              value={category.seo_title || ""}
              onChange={e => handleFieldChange("seo_title", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="seo_description">SEO Description</Label>
            <Textarea
              id="seo_description"
              value={category.seo_description || ""}
              onChange={e => handleFieldChange("seo_description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="seo_keywords">SEO Keywords (comma-separated)</Label>
            <Input
              id="seo_keywords"
              value={category.seo_keywords || ""}
              onChange={e => handleFieldChange("seo_keywords", e.target.value)}
            />
          </div>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={category.image || ""}
              onChange={e => handleFieldChange("image", e.target.value)}
            />
            {category.image && (
              <img src={category.image} alt="Category" className="mt-2 h-20 rounded" />
            )}
          </div>
          <div>
            <Label htmlFor="icon">Icon URL</Label>
            <Input
              id="icon"
              value={category.icon || ""}
              onChange={e => handleFieldChange("icon", e.target.value)}
            />
            {category.icon && (
              <img src={category.icon} alt="Icon" className="mt-2 h-10 w-10 rounded" />
            )}
          </div>
          <div>
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              value={category.thumbnail || ""}
              onChange={e => handleFieldChange("thumbnail", e.target.value)}
            />
            {category.thumbnail && (
              <img src={category.thumbnail} alt="Thumbnail" className="mt-2 h-10 w-10 rounded" />
            )}
          </div>
        </TabsContent>

        {/* Additional Tab */}
        <TabsContent value="additional" className="space-y-4">
          <div>
            <Label htmlFor="custom_field">Custom Field</Label>
            <Input
              id="custom_field"
              value={category.custom_field || ""}
              onChange={e => handleFieldChange("custom_field", e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 