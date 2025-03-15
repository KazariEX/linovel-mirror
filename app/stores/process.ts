import type { BookInfo } from "@linovel/kit";

export const useProcessStore = defineStore("process", () => {
    const processId = ref(-1);
    const optimisticData = ref<BookInfo>();

    const status = ref(false);

    let es: EventSource | null = null;

    function process(id: number, data: any) {
        if (status.value) {
            return;
        }
        processId.value = id;
        optimisticData.value = data;
        status.value = true;

        es = new EventSource(`/update/${id}`);
        es.onmessage = (event) => {
            const { volumeIndex, chapterIndex } = JSON.parse(event.data) as {
                volumeIndex: number;
                chapterIndex: number;
            };
            optimisticData.value!.volumes[volumeIndex]!.chapters[chapterIndex]!.exist = true;
        };
        es.onerror = () => {
            processId.value = -1;
            optimisticData.value = void 0;
            status.value = false;
            es?.close();
        };
    }

    return {
        processId,
        optimisticData,
        status,
        process
    };
});