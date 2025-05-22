"use client";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg-y p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">Trulyfree</h1>
          <p className="text-gray-600 mt-1">Store Manager</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}