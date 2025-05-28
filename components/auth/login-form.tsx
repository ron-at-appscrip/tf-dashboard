"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

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
import { useTranslation } from "@/lib/translations";
import { useLanguage } from "@/contexts/language-context";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      console.log("Sending magic link to:", values.email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailSent(true);
      
      setTimeout(() => {
        setIsLoggedIn(true);
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
        <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto">
          <LogIn className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium">{t('auth.login.successfullyLoggedIn')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('auth.login.redirecting')}
        </p>
      </div>
    );
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto">
          <CheckCircle className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium">{t('auth.login.checkEmail')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('auth.login.magicLinkSent', { email: form.getValues("email") })}
        </p>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => setEmailSent(false)}
            className="mt-4"
          >
            {t('auth.login.useDifferentEmail')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary rounded-xl p-4 mb-4 flex items-center justify-center">
        <Home className="text-primary-foreground w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-1">{t('auth.login.title')}</h1>
      <p className="text-muted-foreground mb-6 text-center">{t('auth.login.subtitle')}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground text-sm mb-2">{t('auth.login.emailLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('auth.login.emailPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('auth.login.sendingMagicLink')}
              </>
            ) : (
              <>
                <Home className="w-5 h-5" />
                {t('auth.login.sendMagicLink')}
              </>
            )}
          </Button>
        </form>
      </Form>
      <div className="w-full bg-muted/50 border border-border rounded-lg p-3 flex items-start gap-2 mt-4">
        <Lock className="text-yellow-500 w-5 h-5 mt-0.5" />
        <div>
          <span className="font-semibold text-sm text-foreground">{t('auth.login.secureLogin.title')}</span>
          <span className="text-sm text-muted-foreground ml-1">
            {t('auth.login.secureLogin.description')}
          </span>
        </div>

        
      </div>
      <div className="flex justify-center items-center w-full mb-4">
          <ThemeToggle />
        </div>
    </div>
  );
}