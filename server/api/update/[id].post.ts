import { processBookContent, processBookInfo } from "@linovel/kit";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, "id"));

    const info = await processBookInfo(id);
    await processBookContent(id, info);
});