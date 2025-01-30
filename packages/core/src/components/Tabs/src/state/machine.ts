import { extendMachine } from '@optimacros-ui/store';
import * as tabs from '@zag-js/tabs';
import { sortBy, last, first } from '@optimacros-ui/utils';
import { raf } from '@zag-js/dom-query';
import { DraggableMode, Tab } from '../models';

export const machine = extendMachine(
    tabs,
    {
        context: {
            onTabsChange: (newTabs: Array<Tab>) => {},
            //onValueChange: (newTabId: string) => {},
            /** sorted tabs as they displayed */
            tabs: [] as Array<Tab>,
            /** sorted and enabled tabs */
            selectableTabs: [] as Array<Tab>,
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
            OPEN: { actions: 'open' },
            SET_VALUE: { actions: 'setValue' },
            UPDATE_TABS: { actions: 'updateTabs' },
            SET_TABS: { actions: 'setTabs' },
            ADD_TABS: { actions: 'addTabs' },
            OPEN_FIRST: { actions: 'openFirst' },
            OPEN_LAST: { actions: 'openLast' },
            SCROLL_TO: { actions: 'scrollTo' },
            SCROLL_TO_ACTIVE: { actions: 'scrollToActive' },
            WHEEL: { actions: 'handleWheel' },
        },
    },
    {
        actions: {
            scrollTo: (ctx, { value }, { send }) => {
                const tab = document.querySelector(`[data-id="${value}"]`);

                if (!tab) {
                    return;
                }

                send({ type: 'TAB_FOCUS', value });

                tab.scrollIntoView({ block: 'nearest' });
            },
            scrollToActive: (ctx, evt, { send }) => send({ type: 'SCROLL_TO', value: ctx.value }),
            openFirst: (ctx, evt, { send }) => {
                const firstTab = first(ctx.selectableTabs);

                if (!firstTab) {
                    return;
                }

                send({ type: 'OPEN', value: firstTab.id });
            },
            openLast: (ctx, evt, { send }) => {
                const lastTab = last(ctx.selectableTabs);

                if (!lastTab) {
                    return;
                }

                send({ type: 'OPEN', value: lastTab.id });
            },
            handleWheel: (ctx, event, { send }) => {
                const { deltaY } = event;
                const { loopFocus, value, selectableTabs } = ctx;

                let newActiveTabId = null;

                // select first if there is no active tab
                if (!value) {
                    newActiveTabId = first(selectableTabs).id;
                    // select next enabled tab
                } else {
                    const currentActiveTabIndex = selectableTabs.findIndex((t) => t.id === value);

                    const increment = deltaY > 0 ? 1 : -1;

                    // from first to last
                    if (currentActiveTabIndex === 0 && increment === -1) {
                        if (!loopFocus) {
                            return;
                        }

                        newActiveTabId = last(selectableTabs).id;
                        // from last to first
                    } else if (
                        currentActiveTabIndex === selectableTabs.length - 1 &&
                        increment === 1
                    ) {
                        if (!loopFocus) {
                            return;
                        }

                        newActiveTabId = first(selectableTabs).id;
                    } else {
                        newActiveTabId = selectableTabs[currentActiveTabIndex + increment].id;
                    }

                    send({ type: 'OPEN', value: newActiveTabId });
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
            // fires external callback
            updateTabs: (ctx, { value }) => {
                raf(() => ctx.onTabsChange(value));
            },
            // actually set tabs when external value has changed
            setTabs: (ctx, { value }: { value: Array<Tab> }) => {
                ctx.tabs = sortBy(value, ['fixed']);
                ctx.selectableTabs = ctx.tabs.filter((t) => !t.disabled);
            },
            // fires external callback
            open: (ctx, { value }) => {
                // TODO понять, почему в апи в коннекте в open методе api.value и state.context.value остается старым после развыбора таба
                // разве коннект не вызывается 100 раз по любому поводу? почему функция не пересоздается с новым value?
                // или она пересоздается, но до этого мемоизируется где-то в триггере и не обновляется?
                // я не могу перенести это в апи, буду размазывать логику между апи и мошиной
                const { deselectable, value: activeTabId } = ctx;

                if (deselectable && activeTabId === value) {
                    value = null;
                }

                raf(() => ctx.onValueChange(value));
            },
        },
    },
);
