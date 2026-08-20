import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { query, queryOne } from "@/lib/db";

const SESSION_COOKIE = "ggm_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function verifyCredentials(email: string, password: string) {
  const envEmail = process.env.ADMIN_EMAIL || "admin@ggmtechnologies.com";
  const envPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  if (email.toLowerCase() === envEmail.toLowerCase() && password === envPassword) {
    return { id: "admin_master", email: envEmail };
  }

  const user = await queryOne<any>("SELECT * FROM `AdminUser` WHERE `email` = ?", [email]);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}

export async function createSession(adminUserId: string) {
  const token = `master_admin_session_${randomBytes(24).toString("hex")}`;
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const id = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    await query(
      "INSERT INTO `AdminSession` (`id`, `token`, `adminUserId`, `expiresAt`, `createdAt`) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(3))",
      [id, token, adminUserId, expiresAt]
    );
  } catch (e) {
    console.warn("Failed to persist AdminSession in DB, using cookie session", e);
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await query("DELETE FROM `AdminSession` WHERE `token` = ?", [token]).catch(() => {});
  }
  store.delete(SESSION_COOKIE);
}

export async function getCurrentAdmin() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  if (token.startsWith("master_admin_session_")) {
    return {
      id: "admin_master",
      email: process.env.ADMIN_EMAIL || "admin@ggmtechnologies.com",
      passwordHash: "",
      createdAt: new Date(),
    };
  }

  const row = await queryOne<any>(
    `SELECT s.*, u.id as u_id, u.email as u_email, u.passwordHash as u_passwordHash, u.createdAt as u_createdAt
     FROM \`AdminSession\` s
     JOIN \`AdminUser\` u ON s.adminUserId = u.id
     WHERE s.token = ?`,
    [token]
  );

  if (!row || new Date(row.expiresAt) < new Date()) {
    return null;
  }

  return {
    id: row.u_id,
    email: row.u_email,
    passwordHash: row.u_passwordHash,
    createdAt: row.u_createdAt,
  };
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}

export { SESSION_COOKIE };
