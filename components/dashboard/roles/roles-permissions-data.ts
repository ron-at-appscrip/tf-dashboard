export const defaultPermissionsGroups = [
  {
    key: "store",
    title: "Store Management",
    permissions: [
      { label: "View Stores", description: "View store details", enabled: false },
      { label: "Create Stores", description: "Add new stores", enabled: false },
      { label: "Edit Stores", description: "Modify store settings", enabled: false },
      { label: "Delete Stores", description: "Remove stores from the system", enabled: false },
    ],
  },
  {
    key: "user",
    title: "User Management",
    description: "Permissions related to user administration",
    permissions: [
      { label: "View Users", description: "Can view user accounts and details", enabled: false },
      { label: "Create Users", description: "Can add new users to the platform", enabled: false },
      { label: "Edit Users", description: "Can modify user details", enabled: false },
      { label: "Delete Users", description: "Can deactivate or remove user accounts", enabled: false },
      { label: "Manage Roles", description: "Can create and assign roles to users", enabled: false },
    ],
  },
 
 
]; 