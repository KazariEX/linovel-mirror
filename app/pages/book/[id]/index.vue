<script lang="ts" setup>
    const processStore = useProcessStore();
    const route = useRoute();

    const id = computed(() => Number(route.params.id));

    const { data } = useFetch(`/api/book/${id.value}`, {
        deep: true,
        immediate: processStore.processId !== id.value
    });

    const displayData = computed(() => {
        return processStore.processId === id.value
            ? processStore.optimisticData
            : data.value;
    });
</script>

<template>
    <template v-if="displayData">
        <h1 text="8">{{ displayData.title }}</h1>
        <div m="y-2" text="3.5">
            <span>
                <span text="slate">作者：</span>{{ displayData.novelist }}
            </span>
            <span v-if="displayData.illustrator" m="l-4">
                <span text="slate">画师：</span>{{ displayData.illustrator }}
            </span>
        </div>
        <p
            leading="relaxed"
            v-html="enrichText(displayData.description ?? ``)"
        ></p>
        <div m="t-4 b-6">
            <prime-button
                size="small"
                variant="outlined"
                severity="help"
                @click="processStore.process(id, data)"
            >更新章节</prime-button>
        </div>
        <ul>
            <volume-item
                v-for="info, i in displayData.volumes"
                v-bind="info"
                :book-id="id"
                :index="i"
            />
        </ul>
    </template>
</template>