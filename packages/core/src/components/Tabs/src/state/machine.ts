import { extendMachine } from '@optimacros-ui/store';
import * as tabs from '@zag-js/tabs';
import { round, swap, sortBy } from '@optimacros-ui/utils';
import { raf } from '@zag-js/dom-query';
import { DraggableMode, Tab } from '../models';

export const machine = extendMachine(
    tabs,
    {
        context: {
            onTabsChange: (newTabs: Array<Tab>) => {},
            //onValueChange: (newTabId: string) => {},
            tabs: [] as Array<Tab>,
            /** array of tabs not visible in list */
            draggableMode: 'ordered' as DraggableMode,
            /** whether tabs are draggable or partially draggable */
            draggable: false,
            /** whether tabs are hidden */
            tabsHidden: false,
            useWheel: false,
            value: null,
        },
        on: {
            SCROLL_TO: { actions: 'scrollTo' },
            SCROLL_TO_ACTIVE: { actions: 'scrollToActive' },
            OPEN: { actions: 'open' },
            WHEEL: { actions: 'handleWheel' },
            POSITION_CHANGE: { actions: 'onPositionChange' },
            SET_TABS: { actions: 'setTabs' },
            DRAG_END: { actions: 'handleDragEnd' },
            SYNC_TABS: { actions: 'syncTabs' },
            ADD_TABS: { actions: 'addTabs' },
            SET_VALUE: { actions: 'setValue' },
        },
    },
    {
        actions: {
            scrollTo: (ctx, { value }, { send }) => {
                const tab = document.querySelector(`[data-id="${value}"]`);

                send({ type: 'TAB_FOCUS', value });

                tab.scrollIntoView();
            },
            scrollToActive: (ctx, evt, { send }) => send({ type: 'SCROLL_TO', value: ctx.value }),
            handleWheel: (ctx, event, { send }) => {
                const { deltaY } = event;

                const tabs = ctx.tabs;

                let newActiveTabIndex = null;

                // select first if there is no active tab
                if (!ctx.value) {
                    newActiveTabIndex = 0;
                    // select next enabled tab
                } else {
                    const selectableTabs = tabs.filter((t) => {
                        if (t.disabled || t.fixed) {
                            return false;
                        }

                        return true;
                    });

                    const currentActiveTabIndex = selectableTabs.findIndex(
                        (t) => t.id === ctx.value,
                    );

                    // fixed/disabled(?) tab is selected => select first selectable
                    if (currentActiveTabIndex === -1) {
                        newActiveTabIndex = 0;
                    } else {
                        const increment = deltaY > 0 ? 1 : -1;

                        newActiveTabIndex = currentActiveTabIndex + increment;
                    }

                    if (newActiveTabIndex < 0 || newActiveTabIndex > selectableTabs.length - 1) {
                        return;
                    }

                    send({ type: 'OPEN', value: selectableTabs[newActiveTabIndex].id });
                }
            },
            // actually sets value when external value has changed
            setValue: (ctx, { value }, { send }) => {
                if (value === ctx.value) {
                    send({ type: 'SCROLL_TO', value });
                    return;
                }
                if (value) {
                    send({ type: 'SCROLL_TO', value });
                    ctx.value = value;
                } else {
                    send('ENTER');
                }
            },
            // actually set tabs when external value has changed
            setTabs: (ctx, { value }: { value: Array<Tab> }) => {
                ctx.tabs = sortBy(value, ['fixed']);
            },
            // fires external callback
            open: (ctx, { value }) => {
                raf(() => ctx.onValueChange(value));
            },
            handleDragEnd: (ctx, { data, deltaX }) => {
                // просто клик
                if (deltaX === 0) {
                    return;
                }

                const element = document.querySelector(`[data-id="${data.id}"]`);

                const currentIndex = ctx.tabs.findIndex((t) => t.id === data.id);

                const rect = element.getBoundingClientRect();

                const newIndex = round((currentIndex * rect.width + deltaX) / rect.width, 0);

                // не просто клик (рука дернулась)
                if (currentIndex === newIndex) {
                    return;
                }

                let newTabs;

                if (ctx.draggableMode === 'swap') {
                    newTabs = swap(ctx.tabs, currentIndex, newIndex);
                } else if (ctx.draggableMode === 'ordered') {
                    newTabs = ctx.tabs
                        .toSpliced(currentIndex, 1)
                        .toSpliced(newIndex, 0, ctx.tabs[currentIndex]);
                }

                raf(() => ctx.onTabsChange(newTabs));
            },
        },
    },
);
