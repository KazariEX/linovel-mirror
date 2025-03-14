import { storage, type BookContent, type BookInfo } from "@linovel/kit";

export async function getMetadata(id: number) {
    return await storage.getItem(`/book/${id}/metadata.json`) as BookInfo;
}

export async function getArticle(id: number, chapter: number) {
    return await storage.getItem(`/book/${id}/${chapter}.json`) as BookContent;
}