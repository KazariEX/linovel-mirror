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

export async function processBookContent(
    id: number,
    info: BookInfo,
    onParsed?: (volumeIndex: number, chapterIndex: number) => void
) {
    for (let i = 0; i < info.volumes.length; i++) {
        const { chapters } = info.volumes[i]!;

        for (let j = 0; j < chapters.length; j++) {
            const chapter = chapters[j]!;
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
                await storage.setItem(key, content);
                consola.success(`parse ${key}`);
                onParsed?.(i, j);
            }
        }
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