import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Records an activity log entry. Called from every admin mutation so the
 * admin Activity Log tab shows a full audit trail of who did what, when.
 *
 * Failures are non-fatal — we never want logging to break a successful
 * mutation, so errors are swallowed and logged.
 */
export async function logActivity(params: {
  action: string;
  entity: string;
  entityId?: string | null;
  summary: string;
  actor?: string;
}) {
  try {
    await db.activityLog.create({
      data: {
        action: params.action,
        entity: params.entity,
        entityId: params.entityId ?? null,
        summary: params.summary,
        actor: params.actor ?? "admin",
      },
    });
  } catch (err) {
    console.error("[activity] log failed", err);
  }
}

/** Default site settings seeded into the SiteSetting table. */
export const DEFAULT_SETTINGS: { key: string; value: string; category: string }[] = [
  // general
  { key: "site_name", value: "ClickTake Technologies", category: "general" },
  { key: "tagline", value: "Engineering Tomorrow's Intelligence, Today.", category: "general" },
  { key: "brand_color_primary", value: "#136DFF", category: "general" },
  { key: "brand_color_secondary", value: "#FF53A9", category: "general" },
  { key: "timezone", value: "Asia/Karachi", category: "general" },
  // contact
  { key: "contact_email", value: "info@clicktaketech.com", category: "contact" },
  { key: "contact_phone_uk", value: "+44 7391 653377", category: "contact" },
  { key: "contact_phone_pk", value: "+92 306 9753003", category: "contact" },
  { key: "whatsapp", value: "+44 7391 653377", category: "contact" },
  { key: "address_hq", value: "Flat 312 Kitts Green Road, Birmingham, B33 9SB, UK", category: "contact" },
  // seo
  { key: "default_meta_title", value: "ClickTake Technologies — AI-Native Software Engineering & Digital Agency", category: "seo" },
  { key: "default_meta_description", value: "ClickTake ships production-grade software, AI agents, cloud architecture, digital marketing & creative services across 4 continents.", category: "seo" },
  { key: "google_analytics_id", value: "", category: "seo" },
  { key: "google_site_verification", value: "", category: "seo" },
  // social
  { key: "facebook_url", value: "https://www.facebook.com/clicktaketechnologies/", category: "social" },
  { key: "instagram_url", value: "https://www.instagram.com/clicktaketechologiesuk/", category: "social" },
  { key: "linkedin_url", value: "", category: "social" },
  { key: "twitter_url", value: "", category: "social" },
  { key: "youtube_url", value: "", category: "social" },
  // integrations
  { key: "stripe_publishable_key", value: "", category: "integrations" },
  { key: "recaptcha_site_key", value: "", category: "integrations" },
  { key: "maintenance_mode", value: "off", category: "general" },
];
