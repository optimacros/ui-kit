export const createSelectBoxItems = (count: number) => {
    return new Array(count).fill(0).map((_, i) => {
        return {
            label: `item ${i}`,
            value: `item-value-${i}`,
        };
    });
};
