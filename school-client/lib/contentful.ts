import { createClient, type ContentfulClientApi } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

if (!space || !accessToken) {
  throw new Error(
    "Missing Contentful env vars. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN (or NEXT_PUBLIC_ equivalents).",
  );
}

export const client: ContentfulClientApi<undefined> = createClient({
  space,
  accessToken,
});
