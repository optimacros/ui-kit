import { isUndefined } from '@optimacros-ui/utils';

export const scrollToActiveTab = () => {
    if (!this.tabsScrollerNode || !this.activeTab) {
        return;
    }

    const { width: tabsScrollerWidth } = this.tabsScrollerNode.getBoundingClientRect();
    const position = this.activeTab - this.countFixedTabs;
    const offsetPosition = this.scrollableTabsOffsetsLeft[position];
    const widthPosition = this.scrollableTabsWidth[position];

    if (isUndefined(offsetPosition) || isUndefined(widthPosition)) {
        return;
    }

    const isHiddenLeft = offsetPosition < this.scrollLeft;
    const isHiddenRight = offsetPosition > this.scrollLeft + tabsScrollerWidth;
    const isHiddenPartRight = !isHiddenRight
        ? offsetPosition + widthPosition > this.scrollLeft + tabsScrollerWidth
        : false;

    if (isHiddenLeft || isHiddenRight || isHiddenPartRight) {
        this.scrollToTab(position, isHiddenPartRight);
    }
};
