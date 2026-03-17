import { client } from "@/lib/contentful";

export const getTeachers = async () => {
  const res = await client.getEntries({
    content_type: "teachers",
    include: 5,
  });
  
  return res.items;
};
