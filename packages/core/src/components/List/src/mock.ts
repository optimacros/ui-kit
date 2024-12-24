export const createItems = (count: number) => {
    return new Array(count).fill(0).map((v, i) => ({
        value: `value ${i}`,
        collapsible: i % 2 === 0,
        key: `value ${i}`,
    }));
};
