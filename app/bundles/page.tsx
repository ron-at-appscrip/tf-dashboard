"use client";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { bundles as allBundles } from "@/data/bundles";
import React, { useState } from "react";
import { BundlesFilters } from "@/components/bundles/BundlesFilters";
import { BundlesGrid } from "@/components/bundles/BundlesGrid";
import { BundlesPagination } from "@/components/bundles/BundlesPagination";
import { PlusCircle, ChartArea, Download, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { products } from "@/data/products";

const pageSizeOptions = [5, 10, 20, 50];

export default function BundlesPage() {
  const [bundles, setBundles] = useState(allBundles);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [visibility, setVisibility] = useState("all");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bundleName, setBundleName] = useState("");
  const [description, setDescription] = useState("");
  const [bundleSlug, setBundleSlug] = useState("");
  const [bundleType, setBundleType] = useState("main");
  const [productSearch, setProductSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [storefrontVisible, setStorefrontVisible] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // Filtering logic
  let filteredBundles = bundles.filter((bundle) => {
    // Search
    const query = search.toLowerCase();
    const matchesSearch =
      bundle.name.toLowerCase().includes(query) ||
      bundle.sku.toLowerCase().includes(query) ||
      bundle.description.toLowerCase().includes(query);
    // Type
    const matchesType = type === "all" || bundle.type.includes(type);
    // Status
    const matchesStatus = status === "all" || bundle.type.includes(status);
    // Visibility
    const matchesVisibility = visibility === "all" || bundle.type.includes(visibility);
    return matchesSearch && matchesType && matchesStatus && matchesVisibility;
  });

  const totalBundles = filteredBundles.length;
  const totalPages = Math.ceil(totalBundles / pageSize);
  const paginatedBundles = filteredBundles.slice((page - 1) * pageSize, page * pageSize);

  // Reset to page 1 if filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, type, status, visibility, pageSize]);

  const hasActiveFilters =
    !!search || type !== "all" || status !== "all" || visibility !== "all";

  const handleClearFilters = () => {
    setSearch("");
    setType("all");
    setStatus("all");
    setVisibility("all");
    setPage(1);
  };

  const handleProductToggle = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(productSearch.toLowerCase())
  );
  const selectedProductObjs = products.filter((p) => selectedProducts.includes(p.id));

  // Create Bundle Handler
  function handleCreateBundle() {
    if (!bundleName.trim() || selectedProducts.length === 0) return;
    // Generate a unique SKU and slug
    const sku = `BND-${Date.now()}`;
    const slug = bundleSlug.trim() || bundleName.trim().toLowerCase().replace(/\s+/g, "-");
    const now = new Date();
    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    // Prepare products for bundle
    const bundleProducts = products.filter(p => selectedProducts.includes(p.id)).map((p, idx) => ({
      name: p.name,
      qty: 1,
      price: parseFloat(p.price),
      main: idx === 0,
    }));
    const msrp = bundleProducts.reduce((sum, p) => sum + p.price * p.qty, 0);
    const bundlePrice = msrp; // You can add discount logic if needed
    const customerSaves = 0;
    const type = [bundleType, "active"];
    setBundles(prev => [{
      name: bundleName,
      sku,
      description,
      type,
      products: bundleProducts,
      msrp,
      bundlePrice,
      customerSaves,
      date,
      slug,
      storefront: storefrontVisible,
      seo: {
        title: seoTitle,
        keywords: seoKeywords,
        description: seoDescription,
      },
    }, ...prev]);
    // Reset form and close modal
    setIsCreateModalOpen(false);
    setBundleName("");
    setDescription("");
    setBundleSlug("");
    setBundleType("main");
    setProductSearch("");
    setSelectedProducts([]);
    setStorefrontVisible(false);
    setSeoTitle("");
    setSeoKeywords("");
    setSeoDescription("");
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8 px-2 sm:px-6 lg:px-8 bg-background flex flex-col gap-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Bundles</h1>
            <p className="text-muted-foreground">Manage your product bundles and offers</p>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button variant="outline">
              <ChartArea className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Bundle
            </Button>
          </div>
        </div>
        {/* Create Bundle Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-5xl w-full max-h-[85vh] flex flex-col">
            <div className="mb-2 shrink-0">
              <h2 className="text-2xl font-bold">Create New Bundle</h2>
              <p className="text-muted-foreground text-sm mt-1">Combine products into a bundle offer for your funnels</p>
            </div>
            <div className="flex flex-1 gap-6 min-h-0">
              {/* Left: Bundle Information and Product Selection */}
              <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden grid grid-cols-1 gap-6 md:block">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border min-w-0">
                  <h3 className="text-lg font-semibold mb-2">Bundle Information</h3>
                  <div>
                    <Label htmlFor="bundle-name">Bundle Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="bundle-name"
                      placeholder="e.g., Buy 1 Get 3 Free Freshener Bundle"
                      value={bundleName}
                      onChange={e => setBundleName(e.target.value)}
                      className="mt-1"
                    />
                    <div className="text-xs text-muted-foreground mt-1">This will be displayed to customers</div>
                  </div>
                  <div>
                    <Label htmlFor="bundle-description">Description</Label>
                    <Textarea
                      id="bundle-description"
                      placeholder="Describe what makes this bundle special..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bundle-slug">Bundle Slug </Label>
                      <Input
                        id="bundle-slug"
                        placeholder="buy-1-get-3-freshener"
                        value={bundleSlug}
                        onChange={e => setBundleSlug(e.target.value)}
                        className="mt-1"
                      />
                      <div className="text-xs text-muted-foreground mt-1">URL-friendly identifier</div>
                    </div>
                    <div>
                      <Label htmlFor="bundle-type">Bundle Type</Label>
                      <Select value={bundleType} onValueChange={setBundleType}>
                        <SelectTrigger id="bundle-type" className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Main Offer</SelectItem>
                          <SelectItem value="upsell">Upsell</SelectItem>
                          <SelectItem value="cross-sell">Cross-sell</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Storefront Visibility */}
                  <div className="mt-4 p-4 rounded-lg border border-yellow-300 bg-yellow-50 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-700 text-lg">⚠️</span>
                      <span className="font-semibold text-yellow-800">Storefront Visibility</span>
                    </div>
                    <label className="flex items-center gap-2 text-sm font-medium text-yellow-900">
                      <input
                        type="checkbox"
                        checked={storefrontVisible}
                        onChange={e => setStorefrontVisible(e.target.checked)}
                        className="accent-yellow-500"
                      />
                      Show this bundle on storefront
                    </label>
                    <div className="text-xs text-yellow-800 mt-1">
                      By default, bundles are only visible in funnels. Check this to also show on your main store.
                    </div>
                  </div>
                  {/* Product Selection */}
                  <div className="bg-background rounded-xl border p-4 mt-6">
                    <h4 className="text-base font-semibold mb-3">Select Products</h4>
                    <div className="relative mb-4">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products by name or SKU..."
                        className="pl-8"
                        value={productSearch}
                        onChange={e => setProductSearch(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 max-h-64 overflow-y-auto overflow-x-hidden min-w-0">
                      {filteredProducts.map(product => (
                        <div
                          key={product.id}
                          className={`border rounded-lg p-3 flex flex-col gap-2 bg-white shadow-sm cursor-pointer transition ring-2 ${selectedProducts.includes(product.id) ? 'ring-primary' : 'ring-transparent'}`}
                          onClick={() => handleProductToggle(product.id)}
                          tabIndex={0}
                          role="button"
                          aria-pressed={selectedProducts.includes(product.id)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleProductToggle(product.id)}
                              onClick={e => e.stopPropagation()}
                              className="accent-primary"
                            />
                            {product.displayCategory === "on sale" && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">SALE</span>}
                            {product.displayCategory === "display only" && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">DISPLAY</span>}
                          </div>
                          <div className="font-medium text-sm truncate">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.id}</div>
                          <div className="text-emerald-700 font-semibold text-base mt-1">${product.price}</div>
                          <div className="w-full h-[80px] bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 mt-2 overflow-hidden">
                            {product.images && product.images[0] ? (
                              <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full rounded" />
                            ) : (
                              <span>200 x 150</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 p-4 rounded-lg border bg-white flex flex-col gap-4">
                <div className="font-semibold text-base mb-1 border-b pb-2">SEO Settings</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="seo-title">SEO Title</Label>
                    <Input
                      id="seo-title"
                      placeholder="Bundle name for search..."
                      value={seoTitle}
                      onChange={e => setSeoTitle(e.target.value)}
                      className="mt-1"
                      maxLength={60}
                    />
                    <div className="text-xs text-muted-foreground mt-1">Recommended: 50-60 characters</div>
                  </div>
                  <div>
                    <Label htmlFor="seo-keywords">Focus Keywords</Label>
                    <Input
                      id="seo-keywords"
                      placeholder="freshener bundle, car, ..."
                      value={seoKeywords}
                      onChange={e => setSeoKeywords(e.target.value)}
                      className="mt-1"
                    />
                    <div className="text-xs text-muted-foreground mt-1">Comma-separated keywords</div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="seo-description">SEO Description</Label>
                  <Textarea
                    id="seo-description"
                    placeholder="Description for search engines and social media..."
                    value={seoDescription}
                    onChange={e => setSeoDescription(e.target.value)}
                    className="mt-1"
                    maxLength={160}
                  />
                  <div className="text-xs text-muted-foreground mt-1">Recommended: 150-160 characters</div>
                </div>
              </div>
                </div>
              </div>
              {/* Right: Bundle Preview (Sticky) */}
              <div className="bg-white rounded-xl shadow p-6 border flex flex-col gap-4 min-w-[300px] max-w-[350px] w-full md:w-[350px] self-start sticky top-0 h-fit">
                <h3 className="text-lg font-semibold mb-2">Bundle Preview</h3>
                {selectedProductObjs.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center border border-dashed rounded-lg min-h-[120px] text-muted-foreground text-center text-sm">
                    Select products to add to your bundle
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                    {selectedProductObjs.map(product => (
                      <div key={product.id} className="flex w-[95%] items-center gap-3 border rounded-lg p-2 bg-background relative group">
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-red-50 hover:text-destructive transition opacity-80 group-hover:opacity-100"
                          onClick={() => handleProductToggle(product.id)}
                          tabIndex={0}
                          aria-label={`Remove ${product.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full rounded" />
                          ) : (
                            <span>200 x 150</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{product.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{product.id}</div>
                        </div>
                        <div className="text-emerald-700 font-semibold text-base">${product.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* SEO Settings */}
              
            </div>
            {/* Footer */}
            <div className="flex justify-end gap-2 mt-6 shrink-0">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button
                onClick={handleCreateBundle}
                disabled={!bundleName.trim() || selectedProducts.length === 0}
                className="bg-primary text-white flex items-center gap-2"
              >
                <span role="img" aria-label="package">📦</span> Create Bundle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Filters */}
        <BundlesFilters
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          status={status}
          setStatus={setStatus}
          visibility={visibility}
          setVisibility={setVisibility}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalBundles={totalBundles}
          showingCount={paginatedBundles.length}
          pageSizeOptions={pageSizeOptions}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
        {/* Bundles grid */}
        <BundlesGrid bundles={paginatedBundles} />
        {/* Pagination controls */}
        <BundlesPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </AdminLayout>
  );
} 