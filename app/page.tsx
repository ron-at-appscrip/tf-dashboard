import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Box className="h-6 w-6" />
          <span className="text-lg font-semibold">Trulyfree</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="max-w-3xl space-y-6">
          <Box className="mx-auto h-16 w-16" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Trulyfree Storefront Manager
          </h1>
          <p className="mx-auto max-w-prose text-lg text-muted-foreground">
            Seamlessly manage lead funnels and power your headless e-commerce storefront
            with our all-in-one solution.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 px-6 md:px-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Trulyfree. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}