import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as tabs from '@zag-js/tabs';
import {
    isVisibleInParentViewport,
    filter,
    useEventListener,
    round,
    swap,
} from '@optimacros-ui/utils';
import {
    ComponentProps,
    PropsWithChildren,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useId,
    useState,
} from 'react';
import { Menu as BaseMenu } from '@optimacros-ui/menu';
import { Draggable as DraggableComponent } from '@optimacros-ui/draggable';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    id: 'tabs',
    machine: tabs,
    connect(api, { state, send }) {
        const getListNode = () => {
            const containerNode = document.getElementById(`tabs:${state.context.id}:list`);

            return containerNode;
        };

        const scrollTo = (value: string) => {
            const tab = api.getTriggerProps({ value });

            send({ type: 'TAB_FOCUS', value });

            document.getElementById(tab.id).scrollIntoView();
        };

        const open = (value?: string) => {
            if (value) {
                scrollTo(value);

                api.setValue(value);
            } else {
                send('ENTER');
            }
        };

        const getHiddenTabs = () => {
            const containerNode = getListNode();

            return filter(
                containerNode?.children,
                (element, index) => !isVisibleInParentViewport(containerNode, element),
            ).map((element, i, arr) => {
                const value = element.getAttribute('data-value');

                return {
                    value,
                    onClickCapture: () => open(value),
                };
            });
        };

        const last = () => send('END');

        const first = () => send('HOME');

        const scrollToActive = () => scrollTo(api.value);

        return {
            ...api,
            scrollTo,
            open,
            getHiddenTabs,
            scrollToActive,
            last,
            first,
        };
    },
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>> & {
    variant?: 'primary' | 'secondary';
};

export const Root = forward<RootProps, 'div'>(
    ({ children, variant, className, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {(api) => (
                    <styled.div
                        {...api.getRootProps()}
                        ref={ref}
                        data-variant={variant}
                        className={className}
                    >
                        {children}
                    </styled.div>
                )}
            </RootProvider>
        );
    },
);

export const List = forward<{ children: ReactNode }, 'ul'>((props, ref) => {
    const api = useApi();

    return <styled.ul {...api.getListProps()} {...props} ref={ref} />;
});

export const DraggableList = forward<
    {
        mode?: 'swap' | 'ordered';
        setTabs: (prev: (arr: any[]) => any[]) => void;
        tabs: Array<string>;
    },
    'ul'
>(({ tabs, mode = 'ordered', children, setTabs, ...rest }, ref) => {
    const handleDragEnd = useCallback(
        function (event) {
            const element = document.querySelector(`[data-draggable-id="${event.active.id}"]`);
            const currentIndex = parseInt(element.getAttribute('data-index'));
            const rect = element.getBoundingClientRect();

            const newIndex = round((currentIndex * rect.width + event.delta.x) / rect.width, 0);

            if (mode === 'swap') {
                setTabs((prev) => swap(prev, currentIndex, newIndex));
            } else if (mode === 'ordered') {
                setTabs((prev) =>
                    prev.toSpliced(currentIndex, 1).toSpliced(newIndex, 0, prev[currentIndex]),
                );
            }
        },
        [setTabs],
    );

    return (
        <DraggableComponent.Root onDragEnd={handleDragEnd}>
            <List {...rest} ref={ref}>
                {children}
            </List>
        </DraggableComponent.Root>
    );
});

export const Trigger = forward<{ children: ReactNode; value: string; disabled?: boolean }, 'li'>(
    ({ value, disabled, ...rest }, ref) => {
        const api = useApi();

        const apiProps = api.getTriggerProps({ value, disabled });

        return <styled.li {...rest} {...apiProps} ref={ref} key={`trigger-${value}`} />;
    },
);

export const DraggableTrigger = forward<
    { children: ReactNode; value: string; disabled?: boolean; nonDraggable?: boolean },
    'li'
>(({ value, disabled, nonDraggable, ...rest }, ref) => {
    const id = useId();

    const api = useApi();

    const apiProps = api.getTriggerProps({ value, disabled });

    return (
        <DraggableComponent.Item
            id={id}
            ref={ref}
            disabled={nonDraggable}
            data={{ value, disabled }}
        >
            {({ setNodeRef, transform, attributes, listeners, isDragging, id: draggableId }) => (
                <>
                    <styled.li
                        {...rest}
                        {...attributes}
                        {...apiProps}
                        data-dragging={isDragging}
                        data-draggable-id={draggableId}
                        onClick={apiProps.onClick}
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
});

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

export function useHiddenTabs(ref: RefObject<HTMLUListElement>) {
    const api = useApi();
    const [tabs, setTabs] = useState([]);

    useEventListener(
        'scroll',
        () => {
            setTabs(() => api.getHiddenTabs());
        },
        ref,
    );

    useEffect(() => setTabs(() => api.getHiddenTabs()), []);

    return tabs;
}

export const Menu = BaseMenu;

export const HiddenTabsList = forward<
    { children: (tab: { value: string; disabled: boolean; onClick: any }) => any },
    'ul'
>(({ children }, ref) => {
    const hiddenTabs = useHiddenTabs(ref);

    return hiddenTabs.map(children);
});
