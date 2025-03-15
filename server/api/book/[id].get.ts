import { storage } from "@linovel/kit";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, "id"));

    if (id) {
        const data = await getMetadata(id);
        for (const volume of data.volumes) {
            for (const chapter of volume.chapters) {
                if (await storage.has(`/pages/${chapter.link}`)) {
                    chapter.exist = true;
                }
            }
        }
        return data;
    }
});