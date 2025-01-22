import { createReactApiStateContext, extendMachine, forward, styled } from '@optimacros-ui/store';
import * as tabs from '@zag-js/tabs';
import { isVisibleInParentViewport, round, swap, sortBy, debounce } from '@optimacros-ui/utils';
import { ComponentProps, PropsWithChildren, ReactNode, useEffect, useId } from 'react';
import { Menu as BaseMenu } from '@optimacros-ui/menu';
import { raf } from '@zag-js/dom-query';
import { Draggable as DraggableComponent } from '@optimacros-ui/draggable';
const machine = extendMachine(
    tabs,
    {
        context: {
            onPositionChange: (newTabs: Array<Tab>) => {},
            onTabsChange: (newTabs: Array<Tab>) => {},
            tabs: [] as Array<Tab>,
            /** array of tabs not visible in list */
            hiddenTabs: [] as Array<Tab>,
            draggableMode: 'ordered' as 'ordered' | 'swap',
            /** whether tabs are draggable or partially draggable */
            draggable: false,
            /** whether tabs are hidden */
            tabsHidden: false,
            useWheel: false,
        },
        on: {
            SCROLL_TO: { actions: 'scrollTo' },
            SCROLL_TO_ACTIVE: { actions: 'scrollToActive' },
            LAST: { actions: 'last' },
            FIRST: { actions: 'first' },
            OPEN: { actions: 'open' },
            WHEEL: { actions: 'handleWheel' },
            POSITION_CHANGE: { actions: 'onPositionChange' },
            SET_TABS: { actions: 'setTabs' },
            DRAG_END: { actions: 'handleDragEnd' },
            SYNC_TABS: { actions: 'syncTabs' },
            ADD_TABS: { actions: 'addTabs' },
        },
    },
    {
        actions: {
            scrollTo: (ctx, { value }, { send }) => {
                const tab = document.querySelector(`[data-value="${value}"]`);

                send({ type: 'TAB_FOCUS', value });

                tab.scrollIntoView();
            },
            last: (ctx, evt, { send }) => send({ type: 'OPEN', value: ctx.tabs.at(-1).value }),
            first: (ctx, evt, { send }) => send({ type: 'OPEN', value: ctx.tabs.at(0).value }),
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
                        (t) => t.value === ctx.value,
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
            open: (ctx, { value }, { send }) => {
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
            setTabs: (ctx, { value }: { value: Array<Tab> }, { send }) => {
                ctx.tabs = sortBy(value, ['fixed']);

                raf(() => ctx.onTabsChange(ctx.tabs));
            },
            handleDragEnd: (ctx, { data, deltaX }, { send }) => {
                const element = document.querySelector(`[data-value="${data.value}"]`);
                const currentIndex = data.index;
                const rect = element.getBoundingClientRect();

                const newIndex = round((currentIndex * rect.width + deltaX) / rect.width, 0);

                if (ctx.draggableMode === 'swap') {
                    send({ type: 'SET_TABS', value: swap(ctx.tabs, currentIndex, newIndex) });
                } else if (ctx.draggableMode === 'ordered') {
                    send({
                        type: 'SET_TABS',
                        value: ctx.tabs
                            .toSpliced(currentIndex, 1)
                            .toSpliced(newIndex, 0, ctx.tabs[currentIndex]),
                    });
                }
            },
            syncTabs: (ctx, { hiddenOnly }: { hiddenOnly: boolean }, { send }) => {
                const containerNode = document.getElementById(`tabs:${ctx.id}:list`);
                const newTabs = [];
                const hiddenTabs = [];

                for (const tab of containerNode.children) {
                    const tabProps = {
                        value: tab.getAttribute('data-value'),
                        disabled: tab.getAttribute('data-disabled'),
                        fixed: tab.getAttribute('data-fixed'),
                        index: parseInt(tab.getAttribute('data-index')),
                    };

                    newTabs.push(tabProps);

                    if (!isVisibleInParentViewport(containerNode, tab)) {
                        hiddenTabs.push(tabProps);
                    }
                }

                !hiddenOnly && send({ type: 'SET_TABS', value: newTabs });
                ctx.hiddenTabs = hiddenTabs;
            },
            addTabs: (ctx, { value }: { value: Array<Tab> }, { send }) => {
                send({
                    type: 'SET_TABS',
                    value: ctx.tabs.concat(
                        ...value.map((v, i) => ({ ...v, index: i + ctx.tabs.length - 1 })),
                    ),
                });
            },
        },
    },
);
export const { Api, RootProvider, useApi, useProxySelector, useSelector } =
    createReactApiStateContext({
        id: 'tabs',
        machine,
        connect(api, { state, send }) {
            return {
                ...api,
                scrollTo: (value: string) => send({ type: 'SCROLL_TO', value }),
                getTabIndex: (value: string) =>
                    parseInt(
                        document.querySelector(`[data-value=${value}]`).getAttribute('data-index'),
                    ),
                open: (value: string) => send({ type: 'OPEN', value }),
                setTabs: (value: Array<Tab>) => send({ type: 'SET_TABS', value }),
                syncTabs: () => send({ type: 'SYNC_TABS', hiddenOnly: false }),
                syncHiddenTabs: () => send({ type: 'SYNC_TABS', hiddenOnly: true }),
                scrollToActive: () => send('SCROLL_TO_ACTIVE'),
                last: () => send('LAST'),
                first: () => send('FIRST'),
                getTriggerProps({ value, disabled, fixed, index }: Partial<Tab>) {
                    const apiProps = api.getTriggerProps({ value, disabled });

                    return {
                        ...apiProps,
                        'data-value': value,
                        'data-fixed': fixed,
                        'data-index': index,
                    };
                },
                tabs: state.context.tabs,
                hiddenTabs: state.context.hiddenTabs,
                handleDragEnd: (data: Tab, deltaX: number) =>
                    send({ type: 'DRAG_END', deltaX, data }),
                getListId: () => `tabs:${state.context.id}:list`,
                getListProps: () => {
                    return {
                        ...api.getListProps(),
                        hidden: state.context.tabsHidden,
                        onWheel: (e) => send({ type: 'WHEEL', deltaY: e.deltaY }),
                    };
                },
                isActive: (value: string) => {
                    return state.context.value === value;
                },
                draggable: state.context.draggable,
                setValueIndex: (tabIndex: number) => {
                    const tab = state.context.tabs.find(({ index }) => index === tabIndex);
                    tab && api.setValue(tab.value);
                },
                sortTabs: (tabs: Array<Tab>) => {
                    return sortBy(tabs, ['fixed', 'index']);
                },
                addTabs: (tabs: Array<Tab>) => send({ type: 'ADD_TABS', value: tabs }),
            };
        },
    });

export const getTabIndex = (value: string) =>
    parseInt(document.querySelector(`[data-value="${value}"]`).getAttribute('data-index'));

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>> & {
    variant?: 'primary' | 'secondary';
};
const BaseRoot = forward<RootProps, 'div'>(({ children, variant, className, ...rest }, ref) => {
    const rootProps = useSelector((api) => api.getRootProps());
    const syncTabs = useSelector((api) => api.syncTabs);

    useEffect(() => {
        syncTabs();
    }, []);

    return (
        <styled.div {...rest} {...rootProps} ref={ref} data-variant={variant} className={className}>
            {children}
        </styled.div>
    );
});

export const Root = forward<RootProps, 'div'>(
    ({ children, variant, className, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                <BaseRoot variant={variant} ref={ref}>
                    {children}
                </BaseRoot>
            </RootProvider>
        );
    },
);

export const List = forward<{ children: ReactNode }, 'ul'>((props, ref) => {
    const listProps = useProxySelector((api) => api.getListProps());
    const { draggable, handleDragEnd } = useApi();

    if (draggable) {
        return (
            <DraggableComponent.Root
                onDragEnd={(event) =>
                    handleDragEnd(event.active.data.current as Tab, event.delta.x)
                }
            >
                <styled.ul {...listProps} {...props} ref={ref} />
            </DraggableComponent.Root>
        );
    }

    return <styled.ul {...listProps} {...props} ref={ref} />;
});

export interface Tab {
    fixed?: boolean;
    disabled?: boolean;
    value: string;
    index: number;
}

export const Trigger = forward<{ children: ReactNode } & Tab, 'li'>(
    ({ value, disabled, fixed, index, ...rest }, ref) => {
        const api = useApi();

        const apiProps = api.getTriggerProps({ value, disabled, fixed, index });

        return <styled.li {...rest} {...apiProps} ref={ref} key={`trigger-${value}`} />;
    },
);

export const DraggableTrigger = forward<{ children: ReactNode } & Tab, 'li'>(
    ({ value, disabled, fixed, index, ...rest }, ref) => {
        const id = useId();

        const api = useApi();

        const apiProps = api.getTriggerProps({ value, disabled, fixed, index });

        return (
            <DraggableComponent.Item id={id} ref={ref} data={{ value, disabled, fixed, index }}>
                {({
                    setNodeRef,
                    transform,
                    attributes,
                    listeners,
                    isDragging,
                    id: draggableId,
                }) => (
                    <>
                        <styled.li
                            {...rest}
                            {...attributes}
                            {...apiProps}
                            data-dragging={isDragging}
                            data-draggable-id={draggableId}
                            onPointerDown={(e) => {
                                apiProps.onClick(e);
                                listeners.onPointerDown(e);
                            }}
                            ref={setNodeRef}
                            key={`trigger-${value}`}
                        />
                        {isDragging && (
                            <DraggableComponent.DragOverlay
                                data-scope="tabs"
                                data-part="trigger-overlay"
                                style={{
                                    transform: transform && `translateX(${transform.x}px)`,
                                    cursor: 'grabbing',
                                }}
                            >
                                <styled.li
                                    {...rest}
                                    data-scope="tabs"
                                    data-part="trigger"
                                    data-focus
                                    key={`trigger-${value}`}
                                    data-dragging={isDragging}
                                />
                            </DraggableComponent.DragOverlay>
                        )}
                    </>
                )}
            </DraggableComponent.Item>
        );
    },
);

export const Content = forward<{ children: ReactNode; value: string }, 'div'>(
    ({ value, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                {...api.getContentProps({ value })}
                ref={ref}
                key={`content-${value}`}
            />
        );
    },
);

export const Menu = BaseMenu;

export const HiddenTabsList = forward<
    { children: (tab: { value: string; disabled: boolean; onClick: any }) => any },
    'ul'
>(({ children }, ref) => {
    const { hiddenTabs, getListId, syncHiddenTabs, open, tabs } = useApi();

    useEffect(() => {
        const list = document.getElementById(getListId());

        const cb = () => syncHiddenTabs();

        list.addEventListener('scroll', debounce(cb, 200));

        return () => list.removeEventListener('scroll', cb);
    }, []);

    useEffect(() => {
        syncHiddenTabs();
    }, [tabs]);

    return hiddenTabs.map((tab) => children({ ...tab, onClickCapture: () => open(tab.value) }));
});
