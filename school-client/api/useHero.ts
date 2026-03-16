import { client } from "@/lib/contentful";

export const getHero = async () => {
  const res = await client.getEntries({
    content_type: "hero",
    include: 5,
    limit: 1,
  });

  return res.items[0] ?? null;
};
