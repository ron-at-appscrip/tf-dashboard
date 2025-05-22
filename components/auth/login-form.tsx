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
import { CheckCircle, Mail, Loader2, LogIn } from "lucide-react";
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
          <Button
            variant="ghost"
            onClick={() => {
              setIsLoggedIn(true);
              setTimeout(() => {
                router.push("/store-selection");
              }, 1500);
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Skip simulation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending magic link...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send magic link
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}