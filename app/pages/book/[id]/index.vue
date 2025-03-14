<script lang="ts" setup>
    const route = useRoute();

    const id = computed(() => route.params.id);

    const { status, data } = useFetch(`/api/book/${id.value}`);
</script>

<template>
    <template v-if="status === `success`">
        <h1 text="8">{{ data?.title }}</h1>
        <p
            m="t-4 b-8"
            leading="relaxed"
            v-html="enrichText(data?.description ?? ``)"
        ></p>
        <ul>
            <volume-item v-for="info in data?.volumes" v-bind="info"/>
        </ul>
    </template>
</template>