import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
    alias: {
        "@linovel/kit": fileURLToPath(new URL("./packages/kit/src/index.ts", import.meta.url))
    },
    compatibilityDate: "2024-07-19",
    css: [
        "~/assets/index.scss"
    ],
    future: {
        compatibilityVersion: 4
    },
    ssr: false,
    modules: [
        "@nuxt/icon",
        "@nuxt/image",
        "@unocss/nuxt",
        "@vueuse/nuxt"
    ],
    icon: {
        componentName: "iconify"
    },
    image: {
        domains: [
            "rin.linovel.net"
        ]
    }
});