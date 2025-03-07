import { createMachineContext, extendMachine, Zag } from '@optimacros-ui/store';
import * as tabs from '@zag-js/tabs';
import { Tab } from '../types';
import {
    debounce,
    isVisibleInParentViewport,
    preventTrackpadWheel,
    round,
    sortBy,
    swap,
} from '@optimacros-ui/utils';
import { raf } from '@zag-js/dom-query';

export type Schema = Zag.ExtendModuleSchema<
    typeof tabs,
    {
        props: {
            onPositionChange: (newTabs: Array<Tab>) => void;
            onTabsChange: (newTabs: Array<Tab>) => void;
            draggableMode: 'ordered' | 'swap';
            /** whether tabs are draggable or partially draggable */
            draggable: boolean;
            /** whether tabs are hidden */
            tabsHidden: boolean;
            useWheel: boolean;
            tabs: Array<Tab>;
            hiddenTabsEnabled?: boolean;
        };
        context: {
            tabs: Array<Tab>;
            /** array of tabs not visible in list */
            hiddenTabs: Array<Tab>;
        };
        refs: {
            tabsList: HTMLUListElement;
        };
        action: 'scrollTo';
        event:
            | { type: 'SCROLL_TO'; value: string }
            | { type: 'REGISTER_TAB'; value: Tab }
            | { type: 'LAST' }
            | { type: 'FIRST' }
            | { type: 'SCROLL_TO_ACTIVE' }
            | { type: 'OPEN'; value: string }
            | { type: 'WHEEL'; value: { data; deltaX } }
            | { type: 'SET_TABS'; value: Array<Tab> }
            | { type: 'DRAG_END' }
            | { type: 'SYNC_TABS' }
            | { type: 'ADD_TABS' };
    }
>;

const getHiddenTabs = (list: HTMLUListElement) => {
    const containerNode = list;
    if (!containerNode) {
        return;
    }
    const newTabs = [];
    const hiddenTabs = [];

    for (const tab of containerNode.children) {
        const tabProps = {
            value: tab.getAttribute('data-value'),
            disabled: typeof tab.getAttribute('data-disabled') === 'string' && true,
            fixed: tab.getAttribute('data-fixed'),
            index: parseInt(tab.getAttribute('data-index')),
        };

        newTabs.push(tabProps);

        if (!isVisibleInParentViewport(containerNode, tab)) {
            hiddenTabs.push(tabProps);
        }
    }

    return hiddenTabs;
};

const machine = extendMachine<Schema, typeof tabs>(tabs, {
    props(params) {
        return {
            onPositionChange: () => {},
            onTabsChange: () => {},
            draggableMode: 'ordered',
            draggable: false,
            tabsHidden: false,
            useWheel: false,
            tabs: [],
            hiddenTabsEnabled: false,
            ...tabs.machine.props(params),
        };
    },
    refs(params) {
        return {
            ...tabs.machine.refs?.(params),
            tabsList: null,
        };
    },
    context: (params) => {
        const { bindable, getContext, prop } = params;
        return {
            ...tabs.machine.context(params),
            tabs: bindable<Array<Tab>>(() => {
                return {
                    defaultValue: [],
                    value: prop('tabs'),
                };
            }),
            hiddenTabs: bindable<Array<Tab>>(() => {
                return {
                    defaultValue: [],
                };
            }),
        };
    },
    on: {
        SCROLL_TO: { actions: ['scrollTo'] },
        SCROLL_TO_ACTIVE: { actions: ['scrollToActive'] },
        LAST: { actions: ['last'] },
        FIRST: { actions: ['first'] },
        OPEN: { actions: ['open'] },
        WHEEL: { actions: ['handleWheel'] },
        SET_TABS: { actions: ['setTabs'] },
        DRAG_END: { actions: ['handleDragEnd'] },
        SYNC_TABS: { actions: ['syncTabs'] },
        ADD_TABS: { actions: ['addTabs'] },
        REGISTER_TAB: { actions: ['registerTab'] },
        SYNC_HIDDEN_TABS: { actions: ['syncHiddenTabs'] },
    },
    implementations: {
        actions: {
            scrollTo: (service) => {
                const { value } = service.event;

                if (!value) {
                    return;
                }

                const tab = service.refs.get('tabsList').querySelector(`[data-value="${value}"]`);

                service.send({ type: 'TAB_FOCUS', value });

                tab.scrollIntoView();
            },
            last: (service) =>
                service.send({ type: 'OPEN', value: service.context.get('tabs').at(-1)?.value }),
            first: (service) =>
                service.send({ type: 'OPEN', value: service.context.get('tabs').at(0)?.value }),
            scrollToActive: (service) =>
                service.send({ type: 'SCROLL_TO', value: service.context.get('value') }),
            handleWheel: ({ event, context: ctx, send, prop }) => {
                if (!prop('useWheel')) {
                    return;
                }

                const { deltaY } = event;

                const tabs = ctx.get('tabs');

                let newActiveTabIndex = null;

                // select first if there is no active tab
                if (!ctx.get('value')) {
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
                        (t) => t.value === ctx.get('value'),
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

                    send({ type: 'OPEN', value: selectableTabs[newActiveTabIndex].value });
                }
            },
            open: (service) => {
                const {
                    event: { value },
                    send,
                    context,
                } = service;

                if (value === context.get('value')) {
                    send({ type: 'SCROLL_TO', value });
                    return;
                }

                if (value) {
                    send({ type: 'SCROLL_TO', value });

                    context.set('value', value);
                } else {
                    send({ type: 'ENTER' });
                }
            },
            setTabs: ({ context: ctx, event: { value }, prop }) => {
                const sortedTabs = sortBy(value, ['fixed']);

                ctx.set('tabs', sortedTabs);

                raf(() => prop('onTabsChange')(sortedTabs));
            },
            handleDragEnd: ({ context: ctx, event: { data, deltaX }, send, prop, refs }) => {
                const element = refs.get('tabsList').querySelector(`[data-value="${data.value}"]`);
                const currentIndex = data.index;
                const rect = element.getBoundingClientRect();

                const newIndex = round((currentIndex * rect.width + deltaX) / rect.width, 0);

                if (prop('draggableMode') === 'swap') {
                    send({
                        type: 'SET_TABS',
                        value: swap(ctx.get('tabs'), currentIndex, newIndex),
                    });
                } else if (prop('draggableMode') === 'ordered') {
                    send({
                        type: 'SET_TABS',
                        value: ctx
                            .get('tabs')
                            .toSpliced(currentIndex, 1)
                            .toSpliced(newIndex, 0, ctx.get('tabs')[currentIndex]),
                    });
                }

                raf(() => prop('onPositionChange')(ctx.get('tabs')));
            },
            syncHiddenTabs({ prop, refs, context }) {
                if (!prop('hiddenTabsEnabled')) {
                    return;
                }

                const hiddenTabs = getHiddenTabs(refs.get('tabsList'));

                context.set('hiddenTabs', hiddenTabs);
            },
        },
    },
});

interface TriggerProps {
    /**
     * The value of the tab
     */
    value: string;
    /**
     * Whether the tab is disabled
     */
    disabled?: boolean | undefined;
}
interface TriggerState {
    /**
     * Whether the tab is selected
     */
    selected: boolean;
    /**
     * Whether the tab is focused
     */
    focused: boolean;
    /**
     * Whether the tab is disabled
     */
    disabled: boolean;
}

const connect = ((api, { state, send, refs, context, prop }) => {
    return {
        ...api,
        isHiddenTabsEnabled: prop('hiddenTabsEnabled'),
        scrollTo: (value: string) => send({ type: 'SCROLL_TO', value }),
        getTabIndex: (value: string) =>
            parseInt(document.querySelector(`[data-value=${value}]`).getAttribute('data-index')),
        open: (value: string) => send({ type: 'OPEN', value }),
        setTabs: (value: Array<Tab>) => send({ type: 'SET_TABS', value }),
        syncHiddenTabs: () => send({ type: 'SYNC_HIDDEN_TABS' }),
        scrollToActive: () => send({ type: 'SCROLL_TO_ACTIVE' }),
        last: () => send({ type: 'LAST' }),
        first: () => send({ type: 'FIRST' }),
        getTriggerProps({ value, disabled, fixed, index }: Partial<Tab>) {
            const apiProps = api.getTriggerProps({ value, disabled });

            return {
                ...apiProps,
                'data-value': value,
                'data-fixed': fixed,
                'data-index': index,
            };
        },
        tabs: context.get('tabs'),
        hiddenTabs: context.get('hiddenTabs'),
        handleDragEnd: (data: Tab, deltaX: number) => send({ type: 'DRAG_END', deltaX, data }),
        getListId: () => refs.get('tabsList')?.getAttribute('id'),
        getListProps: ({ element }: { element: HTMLUListElement }) => {
            element && refs.set('tabsList', element);

            if (prop('hiddenTabsEnabled') && context.get('hiddenTabs').length === 0 && element) {
                send({ type: 'SYNC_HIDDEN_TABS' });
            }

            return {
                ...api.getListProps(),
                hidden: prop('tabsHidden'),
                onWheel: (e) => {
                    // turn wheel off on trackpads
                    preventTrackpadWheel(e);

                    send({ type: 'WHEEL', deltaY: e.deltaY });
                },
                onScroll: debounce(() => send({ type: 'SYNC_HIDDEN_TABS' }), 200),
            };
        },
        isActive: (value: string) => {
            return context.get('value') === value;
        },
        draggable: prop('draggable'),
        setValueIndex: (tabIndex: number) => {
            const tab = context.get('tabs').find(({ index }) => index === tabIndex);
            tab && api.setValue(tab.value);
        },
        sortTabs: (tabs: Array<Tab>) => {
            return sortBy(tabs, ['fixed', 'index']);
        },
        addTabs: (tabs: Array<Tab>) => send({ type: 'ADD_TABS', value: tabs }),
    };
}) satisfies Zag.ConnectApi<
    Schema,
    Omit<tabs.Api, 'getTriggerState'> & {
        getTriggerState(props: TriggerProps): TriggerState;
    }
>;

export const {
    Api,
    RootProvider,
    useApi,
    useProxySelector,
    useSelector,
    State,
    select,
    slice,
    splitProps,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'tabs',
    machine,
    connect,
});

export type Props = Partial<Schema['props']>;
