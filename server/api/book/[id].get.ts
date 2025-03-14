export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (id) {
        return getMetadata(Number(id));
    }
});