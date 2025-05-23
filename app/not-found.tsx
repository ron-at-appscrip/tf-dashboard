"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store-context";

export default function NotFound() {
  const router = useRouter();
  const { currentStore } = useStore();
  const isAuthenticated = !!currentStore;

  const handleReturn = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(isAuthenticated ? "/dashboard" : "/login");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-center">
        <FileQuestion className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-4xl font-bold tracking-tighter">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-[500px]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleReturn}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button asChild>
            <Link href={isAuthenticated ? "/dashboard" : "/login"}>
              {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 