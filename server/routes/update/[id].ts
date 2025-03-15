import { processBookContent, processBookInfo } from "@linovel/kit";

export default defineEventHandler((event) => {
    const id = Number(getRouterParam(event, "id"));
    const es = createEventStream(event);

    processBookInfo(id).then(async (info) => {
        await processBookContent(id, info, (volumeIndex, chapterIndex) => {
            es.push(
                JSON.stringify({
                    volumeIndex,
                    chapterIndex
                })
            );
        });
        es.close();
    });

    return es.send();
});