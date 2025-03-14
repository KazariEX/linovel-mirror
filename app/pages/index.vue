<script lang="ts" setup>
    const page = ref(1);

    const { status, data } = useFetch("/api/books", {
        query: {
            page
        }
    });
</script>

<template>
    <ul v-if="status === `success`" grid="~ gap-6">
        <book-item
            v-for="val, id in data?.list"
            v-bind="val"
            :id
        />
    </ul>
    <prime-paginator
        m="t-2"
        :rows="30"
        :total-records="data?.total"
        v-model:first="page"
    />
</template>