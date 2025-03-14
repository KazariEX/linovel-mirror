<script lang="ts" setup>
    const count = 24;
    const first = useRouteQuery("page", "1" as string, {
        transform: {
            get: (val) => (Number.parseInt(val) - 1) * count,
            set: (val) => (val / count + 1).toString()
        }
    });

    const { status, data } = useFetch("/api/books", {
        query: {
            first: computed(() => first.value)/* 防止重复触发请求 */,
            count
        }
    });
</script>

<template>
    <ul v-if="status === `success`" grid="~ gap-6">
        <book-item
            v-for="info, id in data?.list"
            v-bind="info"
            :id
        />
    </ul>
    <prime-paginator
        m="t-2"
        :rows="count"
        :total-records="data?.total"
        v-model:first="first"
    />
</template>