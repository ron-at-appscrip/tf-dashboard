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
  {
    key: "api",
    title: "API & Integration Settings",
    description: "Permissions related to external API connections",
    permissions: [
      { label: "View API Settings", description: "Can view API credentials and configuration", enabled: false },
      { label: "Manage API Settings", description: "Can modify API credentials and settings", enabled: false },
      { label: "View API Logs", description: "Can view API request logs and errors", enabled: false },
      { label: "Test API Connections", description: "Can test API connectivity", enabled: false },
    ],
  },
  {
    key: "campaign",
    title: "Campaign Management",
    description: "Permissions related to marketing campaigns",
    permissions: [
      { label: "View Campaigns", description: "Can view campaigns and results", enabled: false },
      { label: "Create Campaigns", description: "Can create new marketing campaigns", enabled: false },
      { label: "Edit Campaigns", description: "Can modify campaign settings and content", enabled: false },
      { label: "Delete Campaigns", description: "Can remove campaigns", enabled: false },
      { label: "Run Campaigns", description: "Can start and stop campaigns", enabled: false },
    ],
  },
  {
    key: "content",
    title: "Content Management",
    description: "Permissions related to website and funnel content",
    permissions: [
      { label: "View Content", description: "Can view website and funnel content", enabled: false },
      { label: "Edit Content", description: "Can modify website and funnel content", enabled: false },
      { label: "Publish Content", description: "Can publish content changes to live sites", enabled: false },
      { label: "Manage Media", description: "Can upload and manage media files", enabled: false },
    ],
  },
]; 