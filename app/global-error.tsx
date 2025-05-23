"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-4 text-center">
            <AlertTriangle className="h-16 w-16 text-destructive" />
            <h1 className="text-4xl font-bold tracking-tighter">Application Error</h1>
            <p className="text-muted-foreground max-w-[500px]">
              A critical error occurred in the application. Please try refreshing the page.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => reset()}>Try again</Button>
              <Button variant="outline" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 