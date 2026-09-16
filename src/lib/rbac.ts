/**
 * RBAC Permission Definitions
 * ===========================
 * Every admin tab/feature has a permission key. Users can have individual
 * permissions toggled on/off. The `role` field is just a label — actual
 * access is controlled by the `permissions` JSON array on the User model.
 *
 * Conventions:
 * - `permissions: null` → full access (super admin)
 * - `permissions: []` → no access (can only log in, sees nothing)
 * - `permissions: ["pages:view", "blog:view"]` → can view pages + blog only
 */

export type PermissionDef = {
  key: string;
  label: string;
  description: string;
  group: string;
};

export const ALL_PERMISSIONS: PermissionDef[] = [
  // Dashboard
  { key: "dashboard:view", label: "View Dashboard", description: "Access the overview dashboard with stats", group: "Dashboard" },

  // CMS — Content
  { key: "pages:view", label: "View Pages", description: "List and read pages", group: "Content" },
  { key: "pages:create", label: "Create Pages", description: "Create new pages", group: "Content" },
  { key: "pages:edit", label: "Edit Pages", description: "Modify existing pages", group: "Content" },
  { key: "pages:delete", label: "Delete Pages", description: "Delete pages", group: "Content" },

  { key: "blog:view", label: "View Blog", description: "List and read blog posts", group: "Content" },
  { key: "blog:create", label: "Create Blog Posts", description: "Create + import blog posts", group: "Content" },
  { key: "blog:edit", label: "Edit Blog Posts", description: "Modify existing blog posts", group: "Content" },
  { key: "blog:delete", label: "Delete Blog Posts", description: "Delete blog posts", group: "Content" },

  { key: "pricing:view", label: "View Pricing", description: "List pricing tiers", group: "Content" },
  { key: "pricing:edit", label: "Edit Pricing", description: "Create/edit/delete pricing tiers", group: "Content" },

  { key: "media:view", label: "View Media", description: "Browse media library", group: "Content" },
  { key: "media:upload", label: "Upload Media", description: "Upload new media files", group: "Content" },
  { key: "media:delete", label: "Delete Media", description: "Delete media files", group: "Content" },

  { key: "team:view", label: "View Team & Jobs", description: "List team members + open jobs", group: "Content" },
  { key: "team:edit", label: "Manage Team & Jobs", description: "Create/edit/delete team members + jobs", group: "Content" },

  // Branding
  { key: "branding:view", label: "View Branding", description: "View theme + typography settings", group: "Branding" },
  { key: "branding:edit", label: "Edit Branding", description: "Modify theme colors, fonts, typography", group: "Branding" },

  // Leads & Applications
  { key: "leads:view", label: "View Leads (CRM)", description: "View the lead pipeline", group: "Leads" },
  { key: "leads:edit", label: "Manage Leads", description: "Create/edit/delete leads + move pipeline stages", group: "Leads" },

  { key: "queries:view", label: "View Contact Queries", description: "List contact form submissions", group: "Leads" },
  { key: "queries:manage", label: "Manage Queries", description: "Update status + delete contact queries", group: "Leads" },

  { key: "applications:view", label: "View Job Applications", description: "List job applications", group: "Leads" },
  { key: "applications:manage", label: "Manage Applications", description: "Update status + delete applications", group: "Leads" },

  { key: "email:view", label: "View Email Center", description: "List email templates", group: "Leads" },
  { key: "email:edit", label: "Edit Email Templates", description: "Create/edit/delete email templates", group: "Leads" },

  { key: "experiments:view", label: "View Experiments", description: "List A/B experiments", group: "Leads" },
  { key: "experiments:edit", label: "Manage Experiments", description: "Create/edit/delete experiments", group: "Leads" },

  // System
  { key: "storage:view", label: "View Storage Settings", description: "View integration config", group: "System" },
  { key: "storage:edit", label: "Edit Storage Settings", description: "Modify integration keys", group: "System" },

  { key: "seo:view", label: "View SEO Audit", description: "Run + view SEO analysis", group: "System" },

  { key: "settings:view", label: "View Config Settings", description: "View site settings", group: "System" },
  { key: "settings:edit", label: "Edit Config Settings", description: "Modify site settings (logo, contact, social)", group: "System" },

  { key: "redirects:view", label: "View Redirects", description: "List URL redirects", group: "System" },
  { key: "redirects:edit", label: "Manage Redirects", description: "Create/edit/delete redirects", group: "System" },

  { key: "security:view", label: "View Security Logs", description: "View security event logs", group: "System" },

  { key: "users:view", label: "View Users", description: "List admin users", group: "System" },
  { key: "users:edit", label: "Manage Users", description: "Create/edit/delete users + assign permissions", group: "System" },

  { key: "activity:view", label: "View Activity Log", description: "View the audit trail", group: "System" },
];

/** Permission groups for UI rendering */
export const PERMISSION_GROUPS = Array.from(new Set(ALL_PERMISSIONS.map((p) => p.group)));

/** Role presets — quick-assign a bundle of permissions */
export const ROLE_PRESETS: Record<string, { label: string; description: string; permissions: string[] | null }> = {
  super_admin: {
    label: "Super Admin",
    description: "Full access to everything — all tabs, all actions",
    permissions: null, // null = all permissions
  },
  admin: {
    label: "Admin",
    description: "Full access except user management",
    permissions: ALL_PERMISSIONS.filter((p) => !p.key.startsWith("users:")).map((p) => p.key),
  },
  editor: {
    label: "Editor",
    description: "Manage content, leads, and branding — no system settings",
    permissions: ALL_PERMISSIONS.filter((p) => {
      const content = ["dashboard:view", "pages:", "blog:", "pricing:", "media:", "team:", "branding:", "leads:", "queries:", "applications:", "email:", "experiments:"];
      return content.some((c) => p.key.startsWith(c)) || p.key === "dashboard:view";
    }).map((p) => p.key),
  },
  author: {
    label: "Author",
    description: "Create + edit blog posts only — read access to pages",
    permissions: ["dashboard:view", "pages:view", "blog:view", "blog:create", "blog:edit", "media:view"],
  },
  viewer: {
    label: "Viewer",
    description: "Read-only access to all content — no create/edit/delete",
    permissions: ALL_PERMISSIONS.filter((p) => p.key.endsWith(":view")).map((p) => p.key),
  },
};

/** Parse a user's permissions JSON into a Set for fast lookup */
export function parsePermissions(permissions: string | null): Set<string> | null {
  if (permissions === null) return null; // null = all (super admin)
  try {
    const arr = JSON.parse(permissions);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
}

/** Check if a parsed permission set grants a specific permission */
export function hasPermission(perms: Set<string> | null, key: string): boolean {
  if (perms === null) return true; // super admin
  return perms.has(key);
}
