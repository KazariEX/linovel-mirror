import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { BookContent, BookInfo } from "@linovel/kit";

export async function getMetadata(id: number) {
    const path = resolve(fileURLToPath(import.meta.url), `../../../data/book/${id}/metadata.json`);
    const file = await readFile(path);
    const text = file.toString();
    return JSON.parse(text) as BookInfo;
}

export async function getArticle(id: number, chapter: number) {
    const path = resolve(fileURLToPath(import.meta.url), `../../../data/book/${id}/${chapter}.json`);
    const file = await readFile(path);
    const text = file.toString();
    return JSON.parse(text) as BookContent;
}