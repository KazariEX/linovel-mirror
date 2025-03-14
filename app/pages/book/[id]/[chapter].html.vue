<script lang="ts" setup>
    const route = useRoute();

    const id = computed(() => route.params.id);
    const chapter = computed(() => route.params.chapter);

    const { status, data } = useFetch(`/api/book/${id.value}/${chapter.value}`);
</script>

<template>
    <template v-if="status === `success`">
        <header m="b-4" text="center">
            <h1 m="b-2" text="6">{{ data?.title }}</h1>
            <span text="3.5 slate">更新时间：{{ data?.updateTime }}</span>
        </header>
        <article
            class="article"
            v-html="data?.rawText"
        ></article>
    </template>
</template>

<style lang="scss">
    .article {
        p {
            line-height: 2rem;
            text-indent: 2em;
        }
    }
</style>