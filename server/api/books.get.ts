import { bookIds, type BookInfo } from "@linovel/kit";

export default defineEventHandler(async (event) => {
    const query = getQuery<{
        first: string;
        count: string;
    }>(event);

    const count = Number.parseInt(query.count);
    const start = Number.parseInt(query.first);
    const end = start + count;

    const total = bookIds.length;
    const list: Record<string, Omit<BookInfo, "volumes"> & {
        cover: string;
    }> = {};

    for (const id of bookIds.slice(start, end)) {
        const data = await getMetadata(id!) as any;

        data.cover = data.volumes[0]?.cover;
        delete data.volumes;
        list[id] = data;
    }

    return {
        total,
        list
    };
});