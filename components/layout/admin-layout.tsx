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
  LogOut,
  UserCog,
  ShoppingBag,
  FileText,
  Megaphone,
  BarChart3,
  HelpCircle,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useStore } from "@/lib/store-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutDialog } from "@/components/auth/logout-dialog";

interface NavItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

const adminNavItems: NavItem[] = [
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
    icon: <UserCog className="h-5 w-5" />,
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

const storeNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  {
    title: "Products",
    icon: <Box className="h-5 w-5" />,
    children: [
      { title: "All Products", href: "/products" },
      { title: "Categories", href: "/categories" },
      { title: "Bundle Builder", href: "/bundle-builder" },
    ],
  },
  {
    title: "Orders",
    icon: <ShoppingBag className="h-5 w-5" />,
    children: [
      { title: "All Orders", href: "/orders" },
      { title: "Draft Orders", href: "/orders/draft" },
      { title: "Submitted Orders", href: "/orders/submitted" },
      { title: "Abandoned Carts", href: "/orders/abandoned" },
    ],
  },
  { title: "Customers", href: "/customers", icon: <Users className="h-5 w-5" /> },
  { title: "Page Builder", href: "/page-builder", icon: <FileText className="h-5 w-5" /> },
  { title: "Campaign Manager", href: "/campaign-manager", icon: <Megaphone className="h-5 w-5" /> },
  { title: "Analytics", href: "/analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { title: "Users & Roles", href: "/users", icon: <UserCog className="h-5 w-5" /> },
  { title: "Support", href: "/support", icon: <HelpCircle className="h-5 w-5" /> },
  { title: "Store Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  { title: "Help & Resources", href: "/help", icon: <BookOpen className="h-5 w-5" /> },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { currentStore } = useStore();

  const navItems = currentStore?.isSuperAdmin ? adminNavItems : storeNavItems;

  // Accordion state: track open/close for each parent by title
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});

  const handleAccordionToggle = (title: string) => {
    setOpenAccordions((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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
            <span className="text-lg font-semibold whitespace-nowrap">
              {currentStore?.isSuperAdmin ? "Super Admin" : currentStore?.name || "TF-TFM"}
            </span>
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
              <li key={item.title}>
                {item.children ? (
                  <>
                    <div
                      className={cn(
                        "flex items-center rounded-md py-2 text-sm hover:bg-gray-700 transition-all duration-300 cursor-pointer select-none",
                        isCollapsed ? "px-2 justify-center" : "px-3"
                      )}
                      onClick={() => handleAccordionToggle(item.title)}
                    >
                      {item.icon}
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap">
                            {item.title}
                          </span>
                          <ChevronRight
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200",
                              openAccordions[item.title] ? "rotate-90" : "rotate-0"
                            )}
                          />
                        </>
                      )}
                    </div>
                    {openAccordions[item.title] && !isCollapsed && (
                      <ul className="ml-8 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <Link
                              href={child.href!}
                              className={cn(
                                "flex items-center rounded-md py-2 text-sm hover:bg-gray-700 transition-all duration-300",
                                pathname === child.href && "bg-gray-700",
                                isCollapsed ? "px-2 justify-center" : "px-3"
                              )}
                            >
                              <span
                                className={cn(
                                  "transition-all duration-300 overflow-hidden whitespace-nowrap",
                                  isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                                )}
                              >
                                {child.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "flex items-center rounded-md py-2 text-sm hover:bg-gray-700 transition-all duration-300",
                      pathname === item.href && "bg-gray-700",
                      isCollapsed ? "px-2 justify-center" : "px-3"
                    )}
                  >
                    {item.icon}
                    {!isCollapsed && (
                      <span className="ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap">
                        {item.title}
                      </span>
                    )}
                  </Link>
                )}
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
              <AvatarFallback>{currentStore?.name.slice(0, 2).toUpperCase() || "SA"}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="transition-all duration-300 overflow-hidden whitespace-nowrap">
                <p className="text-sm font-medium">{currentStore?.name || "Super Admin"}</p>
                <p className="text-xs text-gray-400">{currentStore?.isSuperAdmin ? "System Administrator" : "Store Manager"}</p>
              </div>
            )}
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
           
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Super Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>

      <LogoutDialog
        open={showLogoutDialog}
        setOpen={setShowLogoutDialog}
      />
    </div>
  );
}