<script lang="ts" setup>
    const route = useRoute();

    const id = computed(() => route.params.id);

    const { status, data } = useFetch(`/api/book/${id.value}`);
</script>

<template>
    <template v-if="status === `success`">
        <h1 text="8">{{ data?.title }}</h1>
        <p m="t-4 b-8" v-html="enrichText(data?.description ?? ``)"></p>
        <ul grid="~ gap-8">
            <li v-for="{ title, cover, chapters } in data?.volumes">
                <div flex="~ gap-4 items-start">
                    <nuxt-img w="32" :src="cover"/>
                    <h2 m="b-4" text="5 center">{{ title }}</h2>
                </div>
                <ul grid="~ cols-2" m="t-4" leading="8">
                    <li v-for="{ title, link } in chapters">
                        <nuxt-link
                            un-text="hover:blue"
                            :to="link"
                        >{{ title }}</nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </template>
</template>