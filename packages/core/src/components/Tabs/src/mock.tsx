import { Tab } from './Tabs';

export const createTabs = (): Tab[] => {
    const tabs: Tab[] = new Array(20)
        .fill(0)
        .map((_, i) => ({ id: `tab-${i}`, title: `title-${i}`, content: <p>tab {i} content</p> }));

    tabs[10].fixed = true;
    tabs[15].fixed = true;
    tabs[2].disabled = true;
    tabs[18].disabled = true;

    return tabs;
};
