<script lang="ts" setup>
    import type { BookInfo } from "@linovel/kit";

    defineProps<Omit<BookInfo, "volumes"> & {
        id: string;
        cover: string;
    }>();
</script>

<template>
    <li
        grid="~ cols-[auto_1fr] rows-[auto_auto_1fr] gap-col-4 gap-row-2"
        h="36"
    >
        <nuxt-img grid="row-start-1 row-end-4" w="24" :src="cover"/>
        <nuxt-link
            un-text="5 hover:blue"
            :to="`/book/${id}`"
        >{{ title }}</nuxt-link>
        <ul
            class="no-scrollbar edge-fades-x"
            flex="~ gap-2"
            leading="5"
            text="3 slate nowrap"
        >
            <li
                v-for="category in categorys"
                b="1 solid slate-300 rounded-full"
                p="x-2"
            >{{ category }}</li>
        </ul>
        <p
            overflow="hidden"
            leading="5"
            text="3.5"
            v-html="enrichText(description)"
        ></p>
    </li>
</template>