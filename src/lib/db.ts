import mysql from "mysql2/promise";

const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

const dbUrl = process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite";
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
    connectTimeout: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  try {
    const [rows] = await pool.execute(sql, params);
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
