import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as tabs from '@zag-js/tabs';
import {
    tw,
    isVisibleInParentViewport,
    filter,
    useEventListener,
    round,
    swap,
    clsx,
    noop,
} from '@optimacros/ui-kit-utils';
import {
    ComponentProps,
    PropsWithChildren,
    ReactNode,
    RefObject,
    useEffect,
    useId,
    useState,
} from 'react';
import { Menu as BaseMenu } from '../MenuV2';
import { Draggable as DraggableComponent } from '../Draggable';

export const { Api, Provider, RootProvider, useApi } = createReactApiStateContext({
    api: null as tabs.Api,
    id: 'tabs',
    machine: tabs,
    initialState: null,
    defaultContext: {},
    useExtendApi(state, api) {
        const getListNode = () => {
            const list = api.getListProps();
            const containerNode = document.getElementById(list.id);

            return containerNode;
        };

        const scrollTo = (value: string) => {
            const tab = api.getTriggerProps({ value });

            api.send({ type: 'TAB_FOCUS', value });

            document.getElementById(tab.id).scrollIntoView();
        };

        const open = (value?: string) => {
            if (value) {
                scrollTo(value);

                api.setValue(value);
            } else {
                api.send('ENTER');
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

        const last = () => api.send('END');

        const first = () => api.send('HOME');

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

export const rootClassName = tw``;

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => {
    return (
        <RootProvider {...context}>
            {(api) => (
                <styled.div {...api.getRootProps()} className={rootClassName} ref={ref}>
                    {children}
                </styled.div>
            )}
        </RootProvider>
    );
});

export const listClassName = 'flex relative z-1 overflow-scroll';
export const List = forward<{ children: ReactNode }, 'ul'>((props, ref) => {
    const api = useApi();

    return <styled.ul {...props} {...api.getListProps()} ref={ref} className={listClassName} />;
});

export const DraggableList = forward<
    { mode?: 'swap' | 'ordered'; setTabs: (prev: (arr: any[]) => any[]) => void },
    'ul'
>(({ setTabs, mode = 'ordered', children, ...rest }) => {
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
                <List {...rest}>{children}</List>
            </DraggableComponent.Container>
        </DraggableComponent.Root>
    );
});

export const triggerClassName = tw`first:pr-3 last:pl-3 not-last:not-first:px-3
border-solid border-[var(--border)] border-b-1 cursor-pointer
data-focus:border-[var(--border-focus)] data-focus:text-[var(--text-focus)]
data-selected:border-[var(--border-focus)] data-selected:text-[var(--text-focus)] select-none data-focus:shadow-[var(--shadow-focus)]
outline-none text-sm
`;
export const Trigger = forward<{ children: ReactNode; value: string; disabled?: boolean }, 'li'>(
    ({ value, disabled, ...rest }, ref) => {
        const api = useApi();

        const apiProps = api.getTriggerProps({ value, disabled });

        return (
            <styled.li
                {...rest}
                {...apiProps}
                ref={ref}
                className={triggerClassName}
                key={`trigger-${value}`}
            />
        );
    },
);

export const draggableTriggerClassName = clsx(
    triggerClassName,
    `
    data-[dragging=true]:cursor-grabbing
`,
);
export const DraggableTrigger = forward<
    { children: ReactNode; value: string; disabled?: boolean },
    'li'
>(({ value, disabled, ...rest }) => {
    const id = useId();

    const api = useApi();

    const apiProps = api.getTriggerProps({ value, disabled });

    return (
        <DraggableComponent.Item id={id}>
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
                    className={draggableTriggerClassName}
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
