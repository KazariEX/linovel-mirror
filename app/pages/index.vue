<script lang="ts" setup>
    const count = 30;
    const first = useRouteQuery("page", "1" as string, {
        transform: {
            get: (val) => (Number.parseInt(val) - 1) * count,
            set: (val) => (val / count + 1).toString()
        }
    });

    const { status, data } = useFetch("/api/books", {
        query: {
            first,
            count
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
        :rows="count"
        :total-records="data?.total"
        v-model:first="first"
    />
</template>