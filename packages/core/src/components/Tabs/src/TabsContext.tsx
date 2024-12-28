import { createReactStore } from '@optimacros-ui/store';
import * as tabs from '@zag-js/tabs';
import { findIndex, reduce, map, round, isString, floor, ceil } from '@optimacros-ui/utils';

const initialState = {
    api: null as tabs.Api,
    countFixedTabs: 0,
    countScrolledTabs: 0,
    countScrollableTabs: 0,
    scrollLeft: 0,
    scrollableTabsOffsetsLeft: [] as Array<number>,
    scrollableTabsWidth: [] as Array<number>,
    tabsScrollerNode: null as HTMLDivElement,
};

const { useProxySelector, useActions, select } = createReactStore({
    id: 'tabs',
    initialState,
    createConfig(initialState) {
        return {
            reducers: {
                scrollToTab(
                    state: typeof initialState,
                    payload: { index: number; toRight: boolean },
                ): void {
                    const { index, toRight } = payload;
                    const { tabsScrollerNode, scrollableTabsOffsetsLeft, scrollableTabsWidth } =
                        state;

                    if (!tabsScrollerNode) {
                        return;
                    }

                    if (index >= 0) {
                        const { width: tabsScrollerWidth } =
                            tabsScrollerNode.getBoundingClientRect();

                        tabsScrollerNode.scrollLeft = toRight
                            ? scrollableTabsOffsetsLeft[index] -
                                  tabsScrollerWidth +
                                  scrollableTabsWidth[index] || 0
                            : scrollableTabsOffsetsLeft[index] || 0;

                        state.countScrolledTabs = findIndex(scrollableTabsOffsetsLeft, (offset) => {
                            return offset >= (tabsScrollerNode?.scrollLeft || 0);
                        });
                    } else {
                        this.tabsScrollerNode.scrollLeft = 0;
                        this.countScrolledTabs = 0;
                    }

                    return {
                        ...state,
                    };
                },
                setScrollableTabsOffsetsLeft(state: typeof initialState) {
                    const scrollableTabsOffsetsLeft = reduce(
                        state.scrollableTabsWidth,
                        (result: number[], tabWidth, index) => {
                            if (index > 0) {
                                // ширину предыдущего таба складываем с общей суммой всех пердыдущих табов
                                result.push(
                                    (result[index - 1] ?? 0) +
                                        (state.scrollableTabsWidth[index - 1] ?? 0),
                                );
                            } else {
                                result.push(0); // push(0) так как index == 0 это первый таб
                            }

                            return result;
                        },
                        [],
                    );

                    return {
                        ...state,
                        scrollableTabsOffsetsLeft,
                    };
                },
                setScrollableTabsWidth(
                    state: typeof initialState,
                    { scrollableTabsNodes }: { scrollableTabsNodes },
                ) {
                    const scrollableTabsWidth = map(scrollableTabsNodes, ({ current }) => {
                        return current ? round(current.getBoundingClientRect().width) : 0;
                    });

                    return {
                        ...state,
                        scrollableTabsWidth,
                    };
                },
            },
            selectors: {
                hiddenTabs(
                    state: typeof initialState,
                    scrollableTabsNodes,
                    scrollableTabsChildren,
                    activeTab: number,
                ) {
                    if (!state.tabsScrollerNode) {
                        return [];
                    }

                    const { width: tabsScrollerWidth } =
                        state.tabsScrollerNode.getBoundingClientRect();

                    return reduce(
                        scrollableTabsNodes,
                        (result, { current }, index) => {
                            if (current && scrollableTabsChildren[index]) {
                                const { width: tabWidth } = current.getBoundingClientRect();
                                const position = index + state.countFixedTabs;

                                const {
                                    [index]: { props: childrenTabProps },
                                } = scrollableTabsChildren;

                                const childrenTabContent =
                                    childrenTabProps.title || childrenTabProps.label;

                                const disabled = isString(childrenTabContent)
                                    ? childrenTabProps.disabled
                                    : childrenTabContent && childrenTabContent.props.disabled;

                                const tabProps = {
                                    content: childrenTabContent,
                                    active: activeTab == position,
                                    position,
                                    disabled,
                                };

                                const hiddenOnTheRight =
                                    state.scrollableTabsOffsetsLeft[index] + floor(tabWidth) >
                                    ceil(tabsScrollerWidth) + state.scrollLeft;

                                const hiddenOnTheLeft =
                                    state.scrollableTabsOffsetsLeft[index] < state.scrollLeft;

                                if (hiddenOnTheLeft || hiddenOnTheRight) {
                                    result.push(tabProps);
                                }
                            }

                            return result;
                        },
                        [],
                    );
                },
            },
        };
    },
});
