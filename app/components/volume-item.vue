<script setup lang="ts">
    import type { VolumeInfo } from "@linovel/kit";

    defineProps<VolumeInfo & {
        bookId: number;
        index: number;
    }>();

    const processStore = useProcessStore();
</script>

<template>
    <li m="b-6" p="t-6" b-t="~ solid slate/20">
        <div flex="~ gap-4 items-start">
            <nuxt-img w="32" :src="cover"/>
            <div flex="1">
                <h2 m="b-2" text="5">{{ title }}</h2>
                <p
                    leading="normal"
                    text="3.5 slate"
                    v-html="enrichText(description)"
                ></p>
            </div>
        </div>
        <ul grid="~ sm:cols-2 gap-col-4" m="t-4" leading="8" text="nowrap">
            <li
                v-for="{ title, link, exist }, i in chapters"
                class="no-scrollbar edge-fades-x"
                :class="{
                    [`text-slate pointer-events-none`]: !exist
                }"
                flex="~ items-center gap-1"
            >
                <span text="slate">{{ i }}.</span>
                <nuxt-link
                    un-text="hover:blue"
                    :to="link"
                >{{ title }}</nuxt-link>
                <iconify
                    v-if="processStore.status && processStore.processId === bookId && !exist"
                    name="line-md:loading-twotone-loop"
                />
            </li>
        </ul>
    </li>
</template>