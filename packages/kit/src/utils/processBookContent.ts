import consola from "consola";
import { parse } from "node-html-parser";
import { fetchPage } from "../context/fetch";
import { storage } from "../context/storage";
import type { BookInfo } from "./processBookInfo";

export interface BookContent {
    title: string;
    updateTime: string;
    rawText: string;
}

export async function processBookContent(id: number, info: BookInfo) {
    let dirty = false;
    for (const { chapters } of info.volumes) {
        for (const chapter of chapters) {
            const { link } = chapter;
            const res = await fetchPage(link, {}, transformBookContent, {
                reserveResponse: false
            });

            const key = link.replace(".html", ".json");

            let content: BookContent | null = null;
            if (await storage.hasItem(key)) {
                content = await storage.getItem<BookContent>(key);
            }

            if (content === null) {
                content = parseBookContent(res);
                consola.success(`parse ${key}`);
                await storage.setItem(key, content);
                chapter.exist = true;
                dirty = true;
            }
        }
    }
    if (dirty) {
        await storage.setItem(`/book/${id}/metadata.json`, info);
    }
}

function transformBookContent(res: string) {
    const doc = parse(res);

    const titleEl = doc.querySelector(".article-title");
    const infoEl = doc.querySelector(".read-info");
    const textEl = doc.querySelector(".article-text");

    return (titleEl?.outerHTML ?? "") + (infoEl?.outerHTML ?? "") + (textEl?.outerHTML ?? "");
}

function parseBookContent(res: string): BookContent {
    const doc = parse(res);
    if (doc.childNodes.length <= 1) {
        return {
            title: "",
            updateTime: "",
            rawText: ""
        };
    }

    const titleEl = doc.querySelector(".article-title")!;
    const title = titleEl.textContent.trim();

    const updateTimeEl = doc.querySelector(".article-info:first-of-type")!;
    const updateTime = updateTimeEl.textContent.match(/更新时间：\s(\S*)/)?.[1] ?? "";

    const rawTextEl = doc.querySelector(".article-text")!;
    const rawText = rawTextEl.innerHTML.trim();

    return {
        title,
        updateTime,
        rawText
    };
}