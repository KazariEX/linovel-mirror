import consola from "consola";
import { createFetch, type FetchOptions } from "ofetch";
import { delay } from "../utils";
import { storage } from "./storage";

const TRANSFORMED = "<!-- transformed -->\n";

export const fetch = createFetch({
    defaults: {
        baseURL: "https://www.linovel.net"
    }
});

export async function fetchPage(
    url: string,
    options: FetchOptions = {},
    transform: (res: string) => string = (res) => res,
    {
        forceFetch = false,
        forceTransform = false,
        reserveResponse = true
    } = {}
) {
    let key = "pages" + url.match(/^(https?:\/)?(.*)/)![2];
    if (options.query) {
        const query = new URLSearchParams(options.query ?? {});
        key += "/" + query.toString();
    }

    const isRaw = /\.(?:jpg|jpeg|png|webp)$/.test(url);

    let res = null;
    if (await storage.hasItem(key)) {
        if (isRaw) {
            res = await storage.getItemRaw(key);
        }
        else {
            res = await storage.getItem(key);
        }
    }

    const hasFetched = res !== null;

    if (!hasFetched || forceFetch) {
        res = await fetch(url, options);
        await delay(666, 2333);
        consola.success(`fetch ${url}`);
    }

    if (res instanceof Blob) {
        res = res.stream();
    }

    const canTransform = typeof res === "string";
    const hasTransformed = canTransform && res.startsWith(TRANSFORMED);

    let data = "";

    if (canTransform && !hasTransformed || forceTransform) {
        data = TRANSFORMED + transform(res.replace(TRANSFORMED, ""));
        res = reserveResponse ? data : TRANSFORMED;
        consola.success(`transform ${url}`);
    }

    if (!hasFetched || forceFetch || !hasTransformed || forceTransform) {
        if (isRaw) {
            await storage.setItemRaw(key, res);
        }
        else {
            await storage.setItem(key, res);
        }
    }

    return data;
}