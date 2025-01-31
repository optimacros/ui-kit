import { Tab } from './Tabs';

export const createTabs = (count: number): Tab[] => {
    return new Array(count)
        .fill(0)
        .map((_, i) => ({ value: `tab-${i}`, content: <p>tab {i} content</p> }));
};
