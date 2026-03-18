import { client } from "@/lib/contentful";

export const getAbout = async () => {
  const res = await client.getEntries({
    content_type: "about",
    include: 5,
    limit: 1,
  });

  return res.items[0] ?? null;
};
