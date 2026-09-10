import mysql from "mysql2/promise";

const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

const TIDB_CLOUD_URL = "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite";
const dbUrl = process.env.DATABASE_URL || TIDB_CLOUD_URL;
const isCloudDb =
  dbUrl.includes("aivencloud") ||
  dbUrl.includes("sslMode") ||
  dbUrl.includes("ssl-mode") ||
  dbUrl.includes("tidbcloud") ||
  process.env.NODE_ENV === "production";

export const pool =
  globalForDb.pool ??
  mysql.createPool({
    uri: dbUrl,
    ssl: isCloudDb && !dbUrl.includes("localhost") && !dbUrl.includes("127.0.0.1") ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 8000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

let schemaMigrated = false;
async function ensureSchema() {
  if (schemaMigrated) return;
  schemaMigrated = true;
  try {
    const alterStatements = [
      "ALTER TABLE `CaseStudy` MODIFY `ogImage` LONGTEXT",
      "ALTER TABLE `Service` MODIFY `ogImage` LONGTEXT",
      "ALTER TABLE `BlogPost` MODIFY `ogImage` LONGTEXT",
      "ALTER TABLE `Product` MODIFY `ogImage` LONGTEXT",
      "ALTER TABLE `ServiceLocation` MODIFY `ogImage` LONGTEXT",
      "ALTER TABLE `Testimonial` ADD COLUMN `avatar` LONGTEXT",
      "ALTER TABLE `Testimonial` MODIFY `avatar` LONGTEXT",
      "ALTER TABLE `SiteSettings` ADD COLUMN `logoUrl` LONGTEXT",
      "ALTER TABLE `SiteSettings` MODIFY `logoUrl` LONGTEXT",
      "ALTER TABLE `SiteSettings` ADD COLUMN `ceoImage` LONGTEXT",
      "ALTER TABLE `SiteSettings` MODIFY `ceoImage` LONGTEXT",
      "ALTER TABLE `SiteSettings` ADD COLUMN `aboutImage` LONGTEXT",
      "ALTER TABLE `SiteSettings` MODIFY `aboutImage` LONGTEXT",
      "ALTER TABLE `CertificateDocument` ADD COLUMN `imageUrl` LONGTEXT",
      "ALTER TABLE `CertificateDocument` MODIFY `imageUrl` LONGTEXT",
      "UPDATE `Service` SET `slug` = 'website-development-services' WHERE `slug` IN ('website-development', 'web-development')",
      "UPDATE `Service` SET `slug` = 'e-commerce-Development' WHERE `slug` IN ('e-commerce', 'ecommerce', 'e-commerce-development')",
      "UPDATE `Service` SET `slug` = 'shopify-website-development' WHERE `slug` IN ('shopify-development', 'shopify', 'shopify-wordpress')",
    ];
    for (const sql of alterStatements) {
      await pool.query(sql).catch(() => {});
    }
  } catch (err) {
    // Ignore schema check errors
  }
}

export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  if (!schemaMigrated) {
    ensureSchema().catch(() => {});
  }

  try {
    const queryPromise = pool.query(sql, params);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB_TIMEOUT")), 1500)
    );

    const [rows] = (await Promise.race([queryPromise, timeoutPromise])) as any;
    return rows as T[];
  } catch (error: any) {
    console.warn(`[DB WARNING] Query failed (${sql.slice(0, 40)}...):`, error?.message || error);
    return [];
  }
}

export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  try {
    const rows = await query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  } catch (error: any) {
    console.warn(`[DB WARNING] QueryOne failed (${sql.slice(0, 40)}...):`, error?.message || error);
    return null;
  }
}

export function parseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === "object") return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}
