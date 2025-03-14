import { getArticle } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const chapter = getRouterParam(event, "chapter");

    if (id && chapter) {
        return getArticle(Number(id), Number(chapter));
    }
});