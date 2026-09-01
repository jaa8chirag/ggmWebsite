import fs from "fs";
const content = fs.readFileSync("src/data/serviceDetails.ts", "utf8");
const lines = content.split("\n");
lines.forEach((l, i) => {
  if (l.match(/^\s{2}["']?[a-z0-9-]+["']?:\s*\{/)) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
});
