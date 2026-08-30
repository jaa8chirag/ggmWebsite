import mysql from "mysql2/promise";

async function verify() {
  const conn = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:Chirag30kum%40r@localhost:3306/ggmwebsite"
  );

  console.log("=== 1. VERIFYING SERVICES AND THEIR EXACT ORDER ===");
  const [services] = await conn.query("SELECT `index`, `slug`, `title` FROM `Service` ORDER BY `index` ASC");
  services.forEach((s) => {
    console.log(`[#${s.index}] ${s.title} (${s.slug})`);
  });

  console.log("\n=== 2. VERIFYING QUOTE REQUEST INSERTS & RETRIEVAL ===");
  const testId = `quote_test_${Date.now()}`;
  await conn.query(
    "INSERT INTO `QuoteRequest` (`id`, `name`, `phone`, `serviceSlug`, `serviceTitle`, `pageUrl`, `status`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, 'PENDING', NOW(3))",
    [
      testId,
      "Test Client",
      "+91 98765 43210",
      "website-development",
      "Website Development",
      "http://localhost:3000/services/website-development",
    ]
  );
  console.log("Created test quote with ID:", testId);

  const [quotes] = await conn.query(
    "SELECT `id`, `name`, `phone`, `serviceTitle`, `pageUrl`, `status`, `createdAt` FROM `QuoteRequest` ORDER BY `createdAt` DESC LIMIT 3"
  );
  console.log("\nRecent Quotes in DB:");
  quotes.forEach((q) => {
    console.log(`- ${q.name} | ${q.phone} | Service: ${q.serviceTitle} | Status: ${q.status} | URL: ${q.pageUrl}`);
  });

  await conn.end();
  console.log("\n✅ Verification Successful!");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
