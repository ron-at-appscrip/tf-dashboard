"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store-context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { currentStore } = useStore();
  const isAuthenticated = !!currentStore;

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h1 className="text-4xl font-bold tracking-tighter">Something went wrong!</h1>
        <p className="text-muted-foreground max-w-[500px]">
          {error.message || "An unexpected error occurred. Please try again later."}
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleReturn}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href={isAuthenticated ? "/dashboard" : "/login"}>
              {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 