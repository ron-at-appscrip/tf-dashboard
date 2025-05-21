"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Store,
  Users,
  History,
  Settings,
  Menu,
  X,
  Box
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { UserNav } from "@/components/user-nav";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Stores",
    href: "/admin/stores",
    icon: <Store className="h-5 w-5" />,
    children: [
      {
        title: "All Stores",
        href: "/admin/stores",
        icon: <Store className="h-5 w-5" />,
      },
      // {
      //   title: "Add Store",
      //   href: "/admin/stores/add",
      //   icon: <Store className="h-5 w-5" />,
      // },
      // {
      //   title: "Store API Settings",
      //   href: "/admin/stores/api-settings",
      //   icon: <Store className="h-5 w-5" />,
      // },
    ],
  },
  {
    title: "Users & Roles",
    href: "/admin/roles",
    icon: <Users className="h-5 w-5" />,
    children: [
      {
        title: "All Roles",
        href: "/admin/roles",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "All Users",
        href: "/admin/users",
        icon: <Users className="h-5 w-5" />,
      },
      // {
      //   title: "Store Access",
      //   href: "/admin/users/store-access",
      //   icon: <Users className="h-5 w-5" />,
      // },
    ],
  },
  {
    title: "Audit Logs",
    href: "/admin/audit-logs",
    icon: <History className="h-5 w-5" />,
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(current =>
      current.includes(title)
        ? current.filter(item => item !== title)
        : [...current, title]
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4">
        <div className="flex items-center gap-3 md:hidden">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/admin" className="flex items-center gap-2">
            <Box className="h-6 w-6" />
            <span className="text-lg font-semibold">TF-TFM Admin</span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:gap-2">
          <Link href="/admin" className="flex items-center gap-2">
            <Box className="h-6 w-6" />
            <span className="text-lg font-semibold">TF-TFM Admin</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <LocaleSwitcher />
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-zinc-900 text-white transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center border-b border-zinc-800 px-6 md:hidden">
            <Box className="h-6 w-6" />
            <span className="ml-2 text-lg font-semibold">TF-TFM Admin</span>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.title)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-800",
                          pathname.startsWith(item.href)
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-400"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          {item.title}
                        </div>
                        <svg
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems.includes(item.title) && "rotate-180"
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedItems.includes(item.title) && (
                        <ul className="mt-2 space-y-1 px-6">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-800",
                                  pathname === child.href
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400"
                                )}
                                onClick={() => setSidebarOpen(false)}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-800",
                        pathname === item.href
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800 p-4">
            <div className="flex items-center gap-3 rounded-md bg-zinc-800 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                SA
              </div>
              <div>
                <p className="text-sm font-medium text-white">Super Admin</p>
                <p className="text-xs text-zinc-400">System Administrator</p>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}