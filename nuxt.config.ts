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
    ignore: [
        "data/**/*"
    ],
    ssr: false,
    modules: [
        "@nuxt/icon",
        "@nuxt/image",
        "@primevue/nuxt-module",
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
    },
    primevue: {
        components: {
            prefix: "Prime"
        },
        importTheme: {
            from: "~/themes/index.ts"
        },
        options: {
            ripple: true
        }
    }
});