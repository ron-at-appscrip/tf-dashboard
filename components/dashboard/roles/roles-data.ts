import type { Role } from "./columns";

export const rolesData: Role[] = [
  {
    name: "Admin",
    description: "Full system access",
    users: 5,
    color: "bg-purple-100 text-purple-700"
  },
  {
    name: "Vendor Admin",
    description: "Full access to assigned vendors",
    users: 12,
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "Campaign Manager",
    description: "Can manage campaigns and funnels",
    users: 8,
    color: "bg-green-100 text-green-700"
  },
  {
    name: "Content Editor",
    description: "Can edit page content only",
    users: 15,
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    name: "Analyst",
    description: "Read-only access to analytics",
    users: 7,
    color: "bg-gray-100 text-gray-700"
  },
]; 