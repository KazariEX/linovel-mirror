export function delay(min: number, max = min) {
    return new Promise((res) => {
        const time = min + Math.random() * (max - min);
        setTimeout(res, time);
    });
}