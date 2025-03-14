import { processBookContent, processBookInfo } from "@linovel/kit";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    const info = await processBookInfo(Number(id));
    await processBookContent(info);
});