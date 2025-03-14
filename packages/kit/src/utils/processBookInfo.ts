import consola from "consola";
import { parse } from "node-html-parser";
import { fetchPage } from "../context/fetch";
import { storage } from "../context/storage";

export interface BookInfo {
    title: string;
    categorys: string[];
    description: string;
    volumes: VolumeInfo[];
}

export interface VolumeInfo {
    cover: string;
    title: string;
    count: number;
    description: string;
    chapters: ChapterInfo[];
}

export interface ChapterInfo {
    title: string;
    link: string;
}

export async function processBookInfo(id: number) {
    const res = await fetchPage(`/book/${id}.html`, {}, transformBookInfo);

    const key = `/book/${id}/metadata.json`;

    let info: BookInfo | null = null;
    if (await storage.hasItem(key)) {
        info = await storage.getItem<BookInfo>(key);
    }

    if (info === null) {
        info = parseBookInfo(res);
        consola.success(`parse ${key}`);
        storage.setItem(key, info);
    }

    for (const { cover } of info.volumes) {
        await fetchPage(cover);
    }

    return info;
}

function transformBookInfo(res: string) {
    const doc = parse(res);

    const detailLayoutEl = doc.querySelector(".detail-layout");
    return detailLayoutEl?.outerHTML ?? "";
}

function parseBookInfo(res: string): BookInfo {
    const doc = parse(res);
    if (doc.childNodes.length <= 1) {
        return {
            title: "",
            categorys: [],
            description: "",
            volumes: []
        };
    }

    const titleEl = doc.querySelector(".book-title")!;
    const title = titleEl.textContent;

    const categoryEls = doc.querySelectorAll(".book-cats > a");
    const categorys = categoryEls.map((el) => el.textContent);

    const descEl = doc.querySelector(".about-text")!;
    const description = descEl.textContent;

    const volumeEls = doc.querySelectorAll(".section-list > .section");
    const volumes = volumeEls.map((el) => {
        const volumeInfoEl = el.querySelector(".volume-info")!;

        const coverEl = volumeInfoEl.querySelector("a > img")!;
        const cover = coverEl.getAttribute("src")?.split("!")[0] ?? "";

        const titleEl = volumeInfoEl.querySelector(".volume-title")!;
        const title = titleEl.textContent;

        const countEl = volumeInfoEl.querySelector(".volume-hint")!;
        const count = Number(countEl.textContent.match(/本卷共 (\d*) 字/)?.[1]);

        const descEl = volumeInfoEl.querySelector(".volume-desc .text-content-actual")!;
        const description = descEl.textContent;

        const chapterEls = el.querySelectorAll(".chapter-list .chapter > a");
        const chapters = chapterEls.map((el) => ({
            title: el.textContent,
            link: el.getAttribute("href")!
        }));

        return {
            cover,
            title,
            count,
            description,
            chapters
        };
    });

    return {
        title,
        categorys,
        description,
        volumes
    };
}