import { fileURLToPath } from "node:url";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

export const storage = createStorage({
    driver: fsDriver({
        base: fileURLToPath(new URL("../../data", import.meta.url))
    })
});