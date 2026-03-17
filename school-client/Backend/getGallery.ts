import { client } from "@/lib/contentful";

const getGallery = async () => {
    const response = await client.getEntries({
        content_type: "gallery",
    });
    return response.items;
};

export default getGallery;