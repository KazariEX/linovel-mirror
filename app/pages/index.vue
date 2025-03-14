<script lang="ts" setup>
    const { status, data } = useFetch("/api/books");
</script>

<template>
    <ul v-if="status === `success`" grid="~ gap-6">
        <li
            v-for="{ title, cover, categorys, description }, id in data"
            flex="~ gap-4"
        >
            <nuxt-img w="24" :src="cover"/>
            <div>
                <nuxt-link
                    un-text="5 hover:blue"
                    :to="`/book/${id}`"
                >{{ title }}</nuxt-link>
                <ul
                    flex="~ gap-2"
                    overflow="auto"
                    m="y-2"
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
                    text="3.5"
                    line-clamp="4"
                    v-html="enrichText(description)"
                ></p>
            </div>
        </li>
    </ul>
</template>