"use client";

import { LoginForm } from "@/components/auth/login-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] bg-card text-card-foreground rounded-lg shadow-lg-y p-8">
        <LoginForm />
        <div className="flex justify-center items-center w-full mb-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}