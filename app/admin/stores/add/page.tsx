"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, Info, Upload, X } from "lucide-react";
import { stores } from "@/data/stores";
import { Store } from "@/types/store";
import { useStores } from "@/contexts/store-context";

const formSchema = z.object({
  name: z.string().min(2, "Store name must be at least 2 characters"),
  status: z.enum(["active", "inactive", "pending"]),
  description: z.string().optional(),
  integration_type: z.enum(["tfm", "sticky", "both"]),
  logo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  // TFM Fields
  tfm_vendor_id: z.string().min(1, "TFM Vendor ID is required").optional(),
  tfm_api_key: z.string().min(1, "TFM API Key is required").optional(),
  tfm_api_secret: z.string().min(1, "TFM API Secret is required").optional(),
  tfm_webhook_secret: z.string().optional(),
  tfm_api_endpoint: z.string().url().optional(),
  // Sticky Fields
  sticky_account_id: z.string().min(1, "Sticky Account ID is required").optional(),
  sticky_username: z.string().min(1, "Sticky Username is required").optional(),
  sticky_password: z.string().min(1, "Sticky Password is required").optional(),
  sticky_webhook_secret: z.string().optional(),
  sticky_api_endpoint: z.string().url().optional(),
}).refine((data) => {
  if (data.integration_type === "tfm" || data.integration_type === "both") {
    return !!(data.tfm_vendor_id && data.tfm_api_key && data.tfm_api_secret);
  }
  return true;
}, {
  message: "TFM integration requires Vendor ID, API Key, and API Secret",
  path: ["tfm_vendor_id"]
}).refine((data) => {
  if (data.integration_type === "sticky" || data.integration_type === "both") {
    return !!(data.sticky_account_id && data.sticky_username && data.sticky_password);
  }
  return true;
}, {
  message: "Sticky.io integration requires Account ID, Username, and Password",
  path: ["sticky_account_id"]
});

export default function AddStorePage() {
  const router = useRouter();
  const { addStore } = useStores();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "active",
      description: "",
      integration_type: "tfm",
      logo_url: "",
      tfm_api_endpoint: "https://api.tfmarketplace.com/v1",
      sticky_api_endpoint: "https://api.sticky.io/api",
    },
  });

  const integrationType = form.watch("integration_type");

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        alert("Only PNG, JPG, and GIF files are allowed");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setSelectedFile(null);
    form.setValue("logo_url", "");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Get the highest store ID and increment by 1
      const highestId = Math.max(...stores.map(store => parseInt(store.id)));
      const newId = (highestId + 1).toString();

      // Create new store object
      const newStore: Store = {
        id: newId,
        name: values.name,
        slug: values.name.toLowerCase().replace(/\s+/g, "-"),
        description: values.description || null,
        logo_url: logoPreview || null,
        integration_type: values.integration_type,
        is_active: values.status === "active",
        metadata: {
          tfm: values.integration_type === "tfm" || values.integration_type === "both" ? {
            vendor_id: values.tfm_vendor_id,
            api_key: values.tfm_api_key,
            api_secret: values.tfm_api_secret,
            webhook_secret: values.tfm_webhook_secret,
            api_endpoint: values.tfm_api_endpoint,
          } : null,
          sticky: values.integration_type === "sticky" || values.integration_type === "both" ? {
            account_id: values.sticky_account_id,
            username: values.sticky_username,
            password: values.sticky_password,
            webhook_secret: values.sticky_webhook_secret,
            api_endpoint: values.sticky_api_endpoint,
          } : null,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Add store using the context
      addStore(newStore);

      // Redirect to stores page
      router.push("/admin/stores");
    } catch (error) {
      console.error("Error creating store:", error);
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 flex-col items-start">
          <Link href="/admin/stores" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to Stores
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Add New Store</h1>
            <p className="text-muted-foreground">
              Create and configure a new store integration.
            </p>
          </div>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Creating a store will allow you to connect to either TFM Marketplace,
            Sticky.io, or both systems. Youll need API credentials from these systems
            to complete the integration.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Store Details</CardTitle>
            <CardDescription>
              Enter the basic information for the new store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter store name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>

                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter a detailed description of the store"
                              className="h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="logo_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Logo</FormLabel>
                          <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg bg-muted/5 cursor-pointer relative">
                            <FormControl>
                              <div className="text-center">
                                {logoPreview ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={logoPreview}
                                      alt="Logo preview"
                                      className="w-full h-full object-contain p-2"
                                    />
                                    <button
                                      type="button"
                                      onClick={removeLogo}
                                      className="absolute top-2 right-2 p-1 bg-background rounded-full shadow-sm hover:bg-muted"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm font-medium">Upload logo</p>
                                    <p className="text-xs text-muted-foreground">
                                      PNG, JPG, GIF up to 5MB
                                    </p>
                                    <input
                                      type="file"
                                      accept="image/png,image/jpeg,image/gif"
                                      className="hidden"
                                      onChange={handleLogoChange}
                                    />
                                  </label>
                                )}
                              </div>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Integration Settings</h3>
                  <FormField
                    control={form.control}
                    name="integration_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Integration Type*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select integration type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tfm">TFM Marketplace Only</SelectItem>
                            <SelectItem value="sticky">Sticky.io Only</SelectItem>
                            <SelectItem value="both">Both TFM and Sticky.io</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {(integrationType === "tfm" || integrationType === "both") && (
                  <Card>
                    <CardHeader>
                      <CardTitle>TFM Marketplace Integration</CardTitle>
                      <CardDescription>
                        Configure the TFM Marketplace API connection.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="tfm_vendor_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TFM Vendor ID*</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tfm_api_key"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TFM API Key*</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tfm_api_secret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TFM API Secret*</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tfm_webhook_secret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TFM Webhook Secret</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tfm_api_endpoint"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TFM API Endpoint</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Default: https://api.tfmarketplace.com/v1
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {(integrationType === "sticky" || integrationType === "both") && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Sticky.io Integration</CardTitle>
                      <CardDescription>
                        Configure the Sticky.io API connection.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="sticky_account_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sticky.io Account ID*</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sticky_username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sticky.io Username*</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sticky_password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sticky.io Password*</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sticky_webhook_secret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sticky.io Webhook Secret</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sticky_api_endpoint"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sticky.io API Endpoint</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Default: https://api.sticky.io/api
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" type="button" asChild>
                    <Link href="/admin/stores">Cancel</Link>
                  </Button>
                  <Button type="submit">Create Store</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}