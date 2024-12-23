import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as tabs from '@zag-js/tabs';
import {
    isVisibleInParentViewport,
    filter,
    useEventListener,
    round,
    swap,
    noop,
} from '@optimacros-ui/utils';
import {
    ComponentProps,
    PropsWithChildren,
    ReactNode,
    RefObject,
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
            const list = api.getListProps();
            const containerNode = document.getElementById(list.id);

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

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => {
    return (
        <RootProvider {...context}>
            {(api) => (
                <styled.div {...api.getRootProps()} ref={ref}>
                    {children}
                </styled.div>
            )}
        </RootProvider>
    );
});

export const List = forward<{ children: ReactNode }, 'ul'>((props, ref) => {
    const api = useApi();

    return <styled.ul {...props} {...api.getListProps()} ref={ref} />;
});

export const DraggableList = forward<
    { mode?: 'swap' | 'ordered'; setTabs: (prev: (arr: any[]) => any[]) => void },
    'ul'
>(({ setTabs, mode = 'ordered', children, ...rest }, ref) => {
    const id = useId();

    function handleDragEnd(event) {
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
    }

    return (
        <DraggableComponent.Root onDragEnd={handleDragEnd}>
            <DraggableComponent.Container asChild id={id}>
                <List {...rest} ref={ref}>
                    {children}
                </List>
            </DraggableComponent.Container>
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
    { children: ReactNode; value: string; disabled?: boolean },
    'li'
>(({ value, disabled, ...rest }, ref) => {
    const id = useId();

    const api = useApi();

    const apiProps = api.getTriggerProps({ value, disabled });

    return (
        <DraggableComponent.Item id={id} ref={ref}>
            {({ setNodeRef, transform, attributes, listeners, isDragging, id: draggableId }) => (
                <styled.li
                    {...rest}
                    {...attributes}
                    {...apiProps}
                    data-dragging={isDragging}
                    data-draggable-id={draggableId}
                    onClick={noop}
                    onPointerDown={(e) => {
                        apiProps.onClick(e);
                        listeners.onPointerDown(e);
                    }}
                    ref={setNodeRef}
                    style={{ transform: transform && `translateX(${transform.x}px)` }}
                    key={`trigger-${value}`}
                />
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
