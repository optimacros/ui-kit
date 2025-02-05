import { Tabs } from './';

export const createTabs = (): Tabs.Tab[] => {
    const tabs: Tabs.Tab[] = new Array(20)
        .fill(0)
        .map((_, i) => ({ id: `tab-${i}`, title: `title-${i}` }));

    tabs[10].fixed = true;
    tabs[15].fixed = true;
    tabs[2].disabled = true;
    tabs[18].disabled = true;

    return tabs;
};
