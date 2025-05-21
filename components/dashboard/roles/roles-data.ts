import type { Role } from "./columns";

export const rolesData: Role[] = [
  {
    name: "Admin",
    description: "Full system access",
    users: 5,
  },
  {
    name: "Vendor Admin",
    description: "Full access to assigned vendors",
    users: 12,
  },
  {
    name: "Campaign Manager",
    description: "Can manage campaigns and funnels",
    users: 8,
  },
  {
    name: "Content Editor",
    description: "Can edit page content only",
    users: 15,
  },
  {
    name: "Analyst",
    description: "Read-only access to analytics",
    users: 7,
  },
]; 