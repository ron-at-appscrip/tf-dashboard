"use client";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateBundlePage() {
  const router = useRouter();
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
  const [bundleProductDetails, setBundleProductDetails] = useState<{
    [id: string]: {
      qty: number;
      main: boolean;
      billingModelId: string;
      offerId: string;
      price?: number;
    };
  }>({});

  // When selectedProducts changes, sync bundleProductDetails
  useEffect(() => {
    setBundleProductDetails(prev => {
      const next = { ...prev };
      // Add new products
      selectedProducts.forEach((id, idx) => {
        if (!next[id]) {
          next[id] = {
            qty: 1,
            main: idx === 0 && !Object.values(next).some(x => x.main),
            billingModelId: "",
            offerId: "",
          };
        }
      });
      // Remove unselected products
      Object.keys(next).forEach(id => {
        if (!selectedProducts.includes(id)) delete next[id];
      });
      // Ensure only one main
      const mainIds = Object.entries(next).filter(([_, v]) => v.main).map(([id]) => id);
      if (mainIds.length > 1) {
        // Only keep the first as main
        mainIds.slice(1).forEach(id => { next[id].main = false; });
      }
      // If none is main, set the first as main
      if (Object.values(next).length && !Object.values(next).some(x => x.main)) {
        const firstId = Object.keys(next)[0];
        if (firstId) next[firstId].main = true;
      }
      return next;
    });
  }, [selectedProducts]);

  // Handlers for preview controls
  const handleQtyChange = (id: string, qty: number) => {
    setBundleProductDetails(prev => ({ ...prev, [id]: { ...prev[id], qty: Math.max(1, qty) } }));
  };

  const handleMainChange = (id: string) => {
    setBundleProductDetails(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(pid => { next[pid].main = false; });
      next[id].main = true;
      return next;
    });
  };

  const handleBillingModelChange = (id: string, value: string) => {
    setBundleProductDetails(prev => ({ ...prev, [id]: { ...prev[id], billingModelId: value } }));
  };

  const handleOfferIdChange = (id: string, value: string) => {
    setBundleProductDetails(prev => ({ ...prev, [id]: { ...prev[id], offerId: value } }));
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Create Bundle Handler
  function handleCreateBundle() {
    if (!bundleName.trim() || selectedProducts.length === 0) return;
    // Generate a unique SKU and slug
    const sku = `BND-${Date.now()}`;
    const slug = bundleSlug.trim() || bundleName.trim().toLowerCase().replace(/\s+/g, "-");
    const now = new Date();
    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    // Prepare products for bundle
    const bundleProducts = products.filter(p => selectedProducts.includes(p.id)).map((p) => ({
      name: p.name,
      qty: bundleProductDetails[p.id]?.qty ?? 1,
      price: bundleProductDetails[p.id]?.price !== undefined ? bundleProductDetails[p.id]?.price : parseFloat(p.price),
      main: !!bundleProductDetails[p.id]?.main,
      billingModelId: bundleProductDetails[p.id]?.billingModelId || "",
      offerId: bundleProductDetails[p.id]?.offerId || "",
    }));
    const msrp = bundleProducts.reduce((sum, p) => sum + (p.price ?? 0) * p.qty, 0);
    const bundlePrice = msrp; // You can add discount logic if needed
    const customerSaves = 0;
    const type = [bundleType, "active"];

    const newBundle = {
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
    };

    // Save to localStorage
    if (typeof window !== 'undefined') {
      const prev = JSON.parse(localStorage.getItem('userBundles') || '[]');
      localStorage.setItem('userBundles', JSON.stringify([newBundle, ...prev]));
    }

    // Navigate back to bundles page
    router.push("/bundles");
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(productSearch.toLowerCase())
  );

  const selectedProductObjs = products.filter(p => selectedProducts.includes(p.id));

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8 px-2 sm:px-6 lg:px-8 bg-background flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/bundles" className="hover:text-foreground transition-colors">
            Bundles
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Create New Bundle</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Create New Bundle</h1>
            <p className="text-muted-foreground">Combine products into a bundle offer for your funnels</p>
          </div>
        </div>

        <div className="flex flex-1 gap-6 min-h-0">
          {/* Left: Bundle Information and Product Selection */}
          <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden grid grid-cols-1 gap-6 md:flex md:flex-col">
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
            <div className="bg-white rounded-xl shadow p-6 border">
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

               {/* SEO Settings */}
            <div className="bg-white rounded-xl shadow p-6 border">
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
              <div className="mt-4">
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
            {/* Product Selection */}
            <div className="bg-white rounded-xl shadow  p-6 border">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 max-h-[35rem] overflow-y-auto overflow-x-hidden min-w-0">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedProducts.includes(product.id)
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleProductToggle(product.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full rounded" />
                        ) : (
                          <span>200 x 150</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-base truncate">{product.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {product.id}</div>
                      </div>
                    </div>
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

          
          </div>

          {/* Right: Bundle Preview (Sticky) */}
          <div className="bg-white rounded-xl shadow p-6 border flex flex-col gap-4 min-w-[300px] max-w-[350px] w-full md:w-[350px] self-start sticky top-0 h-fit">
            <h3 className="text-lg font-semibold mb-2">Bundle Preview</h3>
            <hr className="mb-2" />
            {selectedProducts.length === 0 ? (
              <div className="flex-1 flex items-center justify-center border border-dashed rounded-lg min-h-[120px] text-muted-foreground text-center text-sm">
                Select products to add to your bundle
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                {selectedProductObjs.map(product => (
                  <div key={product.id} className="flex flex-col gap-2 border rounded-lg p-3 bg-background relative group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="font-semibold flex-1 text-base truncate">{product.name}</div>
                      <button
                        type="button"
                        className="bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-red-50 hover:text-destructive transition"
                        onClick={() => handleProductToggle(product.id)}
                        tabIndex={0}
                        aria-label={`Remove ${product.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0 border rounded overflow-hidden bg-white">
                        <Button size="icon" variant="ghost" onClick={() => handleQtyChange(product.id, (bundleProductDetails[product.id]?.qty ?? 1) - 1)} disabled={(bundleProductDetails[product.id]?.qty ?? 1) === 1} className="rounded-none border-0">-</Button>
                        <Input
                          type="number"
                          min={1}
                          value={bundleProductDetails[product.id]?.qty ?? 1}
                          onChange={e => handleQtyChange(product.id, Number(e.target.value))}
                          className="w-12 text-center border-0 focus:ring-0 focus-visible:ring-0 shadow-none"
                          style={{ textAlign: 'center' }}
                        />
                        <Button size="icon" variant="ghost" onClick={() => handleQtyChange(product.id, (bundleProductDetails[product.id]?.qty ?? 1) + 1)} className="rounded-none border-0">+</Button>
                      </div>
                      <span className="mx-2">×</span>
                      <Input
                        type="number"
                        min={0}
                        max={parseFloat(product.price)}
                        value={bundleProductDetails[product.id]?.price !== undefined ? bundleProductDetails[product.id]?.price : parseFloat(product.price)}
                        onChange={e => {
                          let value = Number(e.target.value);
                          if (value > parseFloat(product.price)) value = parseFloat(product.price);
                          setBundleProductDetails(prev => ({ ...prev, [product.id]: { ...prev[product.id], price: value } }));
                        }}
                        className="w-20 text-right"
                        step="0.01"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full rounded" />
                        ) : (
                          <span>200 x 150</span>
                        )}
                      </div>
                      <Checkbox
                        checked={!!bundleProductDetails[product.id]?.main}
                        onCheckedChange={() => handleMainChange(product.id)}
                        id={`main-item-${product.id}`}
                      />
                      <label htmlFor={`main-item-${product.id}`} className="text-sm">Main item</label>
                    </div>
                    <div className="bg-gray-50 w-full border rounded-lg p-2 flex flex-col gap-2">
                      <div className="font-medium text-xs mb-1">Sticky Settings</div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Billing Model ID"
                          value={bundleProductDetails[product.id]?.billingModelId || ""}
                          onChange={e => handleBillingModelChange(product.id, e.target.value)}
                          className="w-1/2"
                        />
                        <Input
                          placeholder="Offer ID"
                          value={bundleProductDetails[product.id]?.offerId || ""}
                          onChange={e => handleOfferIdChange(product.id, e.target.value)}
                          className="w-1/2"
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 w-full border rounded-lg p-2 flex flex-col gap-2">
                      <div className="font-medium text-xs mb-1">Display Text</div>
                    
                        <Input
                          placeholder="Enter Display Text"
                          value={bundleProductDetails[product.id]?.offerId || ""}
                          onChange={e => console.log(e.target.value)}
                        />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Price Summary */}
            {selectedProducts.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4 mt-4 flex flex-col gap-2 border border-blue-100">
                <div className="flex justify-between text-sm">
                  <span>Regular Price:</span>
                  <span>${selectedProductObjs.reduce((sum, p) => sum + (bundleProductDetails[p.id]?.qty ?? 1) * parseFloat(p.price), 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bundle Price:</span>
                  <span>
                    ${selectedProductObjs.reduce((sum, p) => {
                      const details = bundleProductDetails[p.id];
                      const qty = details?.qty ?? 1;
                      const price = details?.price !== undefined ? details.price : parseFloat(p.price);
                      return sum + qty * price;
                    }, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold mt-2">
                  <span>Customer Saves:</span>
                  <span className="text-green-700">${(
                    selectedProductObjs.reduce((sum, p) => sum + (bundleProductDetails[p.id]?.qty ?? 1) * parseFloat(p.price), 0) - 
                    selectedProductObjs.reduce((sum, p) => {
                      const details = bundleProductDetails[p.id];
                      const qty = details?.qty ?? 1;
                      const price = details?.price !== undefined ? details.price : parseFloat(p.price);
                      return sum + qty * price;
                    }, 0)
                  ).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6 shrink-0">
          <Button variant="outline" onClick={() => router.push("/bundles")}>Cancel</Button>
          <Button
            onClick={handleCreateBundle}
            disabled={!bundleName.trim() || selectedProducts.length === 0}
            className="bg-primary text-white flex items-center gap-2"
          >
            <span role="img" aria-label="package">📦</span> Create Bundle
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
} 