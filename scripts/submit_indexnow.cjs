const INDEXNOW_KEY = "ggm78a9c21ef45b98129034dcba11e99";
const HOST = "ggmtechnologies.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

async function submit() {
  console.log("Fetching live sitemap URLs for IndexNow submission...");
  const sitemapRes = await fetch(`http://localhost:3000/sitemap.xml`);
  const text = await sitemapRes.text();
  const matches = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`Discovered ${matches.length} total URLs in sitemap.`);

  // Submit in chunks of up to 10,000 URLs (standard IndexNow limit)
  const batch = matches.slice(0, 10000);
  console.log(`Submitting ${batch.length} URLs to IndexNow (Bing, Yandex, etc.)...`);

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: batch,
      }),
    });
    console.log(`IndexNow Response: ${res.status} ${res.statusText}`);
    if (res.ok || res.status === 200 || res.status === 202) {
      console.log("Successfully submitted URLs to IndexNow! Search engines are crawling now.");
    } else {
      const err = await res.text();
      console.log("Response text:", err);
    }
  } catch (err) {
    console.error("Submission failed:", err.message);
  }
}

submit();
