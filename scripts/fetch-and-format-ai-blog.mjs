import mysql from "mysql2/promise";
import fs from "fs";

async function run() {
  const conn = await mysql.createConnection({
    uri: "mysql://iSRsEqH2SkyvMby.root:bTD5FvytknLlrY9i@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ggmwebsite",
    ssl: { rejectUnauthorized: false }
  });

  const [posts] = await conn.query("SELECT * FROM `BlogPost` WHERE `slug` = ?", ["how-to-rank-on-ai-search-engines-proven-strategies"]);
  if (!posts.length) {
    console.error("Post not found");
    await conn.end();
    return;
  }

  const post = posts[0];
  const [blocks] = await conn.query("SELECT * FROM `BlogBlock` WHERE `postId` = ? ORDER BY `order` ASC", [post.id]);
  const [faqs] = await conn.query("SELECT * FROM `BlogFaq` WHERE `postId` = ? ORDER BY `order` ASC", [post.id]);

  fs.writeFileSync("scripts/blog_backup.json", JSON.stringify({ post, blocks, faqs }, null, 2));
  console.log(`Exported successfully: ${blocks.length} blocks, ${faqs.length} faqs.`);

  await conn.end();
}

run().catch(console.error);
