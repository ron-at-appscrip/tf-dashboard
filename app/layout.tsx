import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { StoreProvider } from "@/lib/store-context";
import { LanguageProvider } from "@/contexts/language-context";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrulyFree Store Manager',
  description: 'Manage your TrulyFree store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}