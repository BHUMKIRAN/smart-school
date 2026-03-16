const fs = require("fs");
const path = require("path");
const { createClient } = require("contentful");

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const key = match[1];
    const value = match[2].replace(/^"|"$/g, "");
    process.env[key] = value;
  }
}

const space =
  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? process.env.CONTENTFUL_SPACE_ID;
const accessToken =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ??
  process.env.CONTENTFUL_ACCESS_TOKEN;
const environment =
  process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ??
  process.env.CONTENTFUL_ENVIRONMENT ??
  "master";

if (!space || !accessToken) {
  console.error(
    "Missing Contentful env vars. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN (or NEXT_PUBLIC_ equivalents)."
  );
  process.exit(1);
}

const client = createClient({ space, accessToken, environment });

const run = async () => {
  const hero = await client.getEntries({
    content_type: "hero",
    include: 5,
    limit: 1,
  });
  console.log("HERO FIELDS:");
  console.log(JSON.stringify(hero.items[0]?.fields ?? null, null, 2));

  const committee = await client.getEntries({
    content_type: "schoolCommittee",
    include: 5,
  });
  console.log("COMMITTEE ITEMS (all):");
  console.log(
    JSON.stringify(
      committee.items.map((i) => ({ id: i.sys.id, fields: i.fields })),
      null,
      2
    )
  );
};

run().catch((error) => {
  console.error("Contentful fetch failed:", error?.message || error);
  process.exit(1);
});
