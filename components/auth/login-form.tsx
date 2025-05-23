"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail, Loader2, LogIn, Home, Lock } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // Here you would typically make an API call to send the magic link
      console.log("Sending magic link to:", values.email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailSent(true);
      
      // Simulate successful login after 3 seconds
      setTimeout(() => {
        setIsLoggedIn(true);
        // Redirect after showing success message
        setTimeout(() => {
          router.push("/store-selection");
        }, 1500);
      }, 3000);
    } catch (error) {
      console.error("Error sending magic link:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="text-center space-y-4">
        <div className="rounded-full bg-green-100 p-3 w-fit mx-auto">
          <LogIn className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium">Successfully logged in!</h3>
        <p className="text-sm text-muted-foreground">
          Redirecting to store selection...
        </p>
      </div>
    );
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="rounded-full bg-green-100 p-3 w-fit mx-auto">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium">Check your email</h3>
        <p className="text-sm text-muted-foreground">
          We sent a magic link to {form.getValues("email")}. Click the link to sign in.
        </p>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => setEmailSent(false)}
            className="mt-4"
          >
            Use a different email
          </Button>
        
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-green-500 rounded-xl p-4 mb-4 flex items-center justify-center">
        <Home className="text-white w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-green-700 mb-1">TrulyFree</h1>
      <p className="text-gray-500 mb-6 text-center">Store Manager</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 text-sm mb-2">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending magic link...
              </>
            ) : (
              <>
                <Home className="w-5 h-5" />
                Send Magic Link
              </>
            )}
          </Button>
        </form>
      </Form>
      <div className="w-full bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2 mt-4">
        <Lock className="text-yellow-500 w-5 h-5 mt-0.5" />
        <div>
          <span className="font-semibold text-sm text-gray-700">Secure Login:</span>
          <span className="text-sm text-gray-600 ml-1">
            We&apos;ll send you a secure magic link to access your store manager dashboard.
          </span>
        </div>
      </div>
    </div>
  );
}