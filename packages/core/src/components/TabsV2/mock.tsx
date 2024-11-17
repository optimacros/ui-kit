export const createTabs = (count: number) => {
    return new Array(count)
        .fill(0)
        .map((_, i) => ({ value: `tab ${i}`, content: <p>tab {i} content</p> }));
};
