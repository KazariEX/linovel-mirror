import { bookIds, type BookInfo } from "@linovel/kit";

export default defineEventHandler(async () => {
    const results: Record<string, Omit<BookInfo, "volumes"> & {
        cover: string;
    }> = {};
    for (const id of bookIds.slice(0, 30)) {
        const data = await getMetadata(id!) as any;

        data.cover = data.volumes[0]?.cover;
        delete data.volumes;
        results[id] = data;
    }
    return results;
});