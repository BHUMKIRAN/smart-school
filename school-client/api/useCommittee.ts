import { client } from "@/lib/contentful";

export const getCommittee = async () => {
  const res = await client.getEntries({
    content_type: "schoolCommittee",
    include: 5,
  });
 console.log(res);
  return res.items;
};
