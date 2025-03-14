import { bookIds, type BookInfo } from "@linovel/kit";

export default defineEventHandler(async (event) => {
    const { page } = getQuery<{
        page: string;
    }>(event);

    const list: Record<string, Omit<BookInfo, "volumes"> & {
        cover: string;
    }> = {};

    const total = bookIds.length;
    const start = (Number.parseInt(page) - 1) * 30;
    const end = start + 30;

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