"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Users,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Box,
  Search,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
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
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Roles",
    href: "/admin/roles",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Audit Logs",
    href: "/admin/audit-logs",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-[#1C2434] text-white transition-[width] duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-700">
          <div className={cn(
            "flex items-center space-x-2 overflow-hidden transition-all duration-300",
            isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
          )}>
            <Box className="h-6 w-6" />
            <span className="text-lg font-semibold whitespace-nowrap">TF-TFM</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-700 ml-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md py-2 text-sm hover:bg-gray-700 transition-all duration-300",
                    pathname === item.href && "bg-gray-700",
                    isCollapsed ? "px-2 justify-center" : "px-3"
                  )}
                >
                  {item.icon}
                  <span className={cn(
                    "ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap",
                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  )}>
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center" : "space-x-3"
          )}>
            <Avatar>
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div className={cn(
              "transition-all duration-300 overflow-hidden whitespace-nowrap",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              <p className="text-sm font-medium">Super Admin</p>
              <p className="text-xs text-gray-400">System Administrator</p>
            </div>
          </div>
        </div>
      </aside>
      <div className={cn(
        "flex-1 transition-all duration-300",
        isCollapsed ? "ml-16" : "ml-64"
      )}>
        <header className="sticky top-0 z-40 h-16 border-b bg-background flex items-center px-6">
          <div className="flex-1 flex items-center space-x-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LocaleSwitcher />
            <ModeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Avatar>
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}