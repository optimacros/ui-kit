import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { isFunction, tw } from '@optimacros-ui/utils';
import { Portal } from '@zag-js/react';
import * as select from '@zag-js/select';
import { ComponentProps, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { Virtual } from '@optimacros-ui/virtual';

export const { useApi, RootProvider, Api } = createReactApiStateContext({
    api: null as select.Api,
    id: 'select',
    machine: select,
    initialState: null,
});

export interface RootProps<T extends unknown = unknown> extends select.CollectionOptions<T> {}

export const Root = forward<RootProps & ComponentProps<typeof RootProvider>, 'div'>(
    (props, ref) => {
        const { items, isItemDisabled, itemToString, itemToValue, ...rest } = props;

        const [providerProps, divProps] = select.splitProps(rest as unknown);

        const collection = useMemo(
            () =>
                select.collection({
                    items,
                    isItemDisabled,
                    itemToString,
                    itemToValue,
                }),
            [items, isItemDisabled, itemToString, itemToValue],
        );

        return (
            <RootProvider collection={collection} {...providerProps}>
                {(api) => <styled.div {...divProps} {...api.getRootProps()} ref={ref} />}
            </RootProvider>
        );
    },
);

export const controlClassName = tw`flex`;
export const Control = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div {...props} {...api.getControlProps()} ref={ref} className={controlClassName} />
    );
});

export const HiddenInput = forward<{}, 'select'>((props, ref) => {
    const api = useApi();

    return <styled.select {...props} {...api.getHiddenSelectProps()} ref={ref} />;
});

export const Trigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getTriggerProps()} ref={ref} />;
});

export const CloseTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return (
        <styled.button
            {...props}
            data-scope="select"
            data-part="close-trigger"
            onClick={() => api.setOpen(false)}
            ref={ref}
        />
    );
});

export const FloatingCloseTrigger = (props) => {
    return <CloseTrigger className="top-1 right-1 absolute" {...props} />;
};

export const Positioner = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <Portal>
            <styled.div {...props} {...api.getPositionerProps()} ref={ref} />
        </Portal>
    );
});

export const Content = forward<{ size?: 'sm' | 'md' }, 'div'>(({ size = 'md', ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...rest}
            {...api.getContentProps()}
            data-size={size}
            data-orientation="vertical"
            ref={ref}
        />
    );
});

export const Value = forward<{}, 'span'>((props, ref) => {
    const api = useApi();

    return <styled.span {...props} {...api.getValueTextProps()} ref={ref} />;
});

export const List = forward<{ children: (item: unknown) => ReactNode }, 'ul'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.ul {...rest} data-scope="select" data-part="list" ref={ref}>
                {api.collection.items.map(children)}
            </styled.ul>
        );
    },
);

export const VirtualList = forward<Virtual.ListProps, 'div'>(({ children, ...rest }, ref) => {
    const api = useApi();
    const scrollerRef = useRef<HTMLDivElement>(null);

    //TODO: check if possible to optimize
    useEffect(() => {
        const el = scrollerRef.current?.querySelector(
            `[data-index="${api.highlightedItem?.index}"]`,
        );

        if (!el?.matches(':hover')) {
            el?.scrollIntoView({
                block: 'end',
            });
        }
    }, [api.highlightedItem?.index]);

    return (
        <Virtual.Root data-scope="select" data-part="virtual-list" ref={ref}>
            <Virtual.List
                {...rest}
                data={api.collection.items}
                data-scope="select"
                data-part="list"
                scrollerRef={useCallback(
                    (ref) =>
                        //@ts-ignore
                        (scrollerRef.current = ref?.querySelector(
                            '[data-testid=virtuoso-item-list]',
                        )),
                    [],
                )}
            >
                {children}
            </Virtual.List>
        </Virtual.Root>
    );
});

export const Item = forward<
    select.ItemProps & { children: ReactNode | ((props: select.ItemState) => ReactNode) },
    'li'
>(({ item, persistFocus, children, ...rest }, ref) => {
    const api = useApi();
    const apiProps = api.getItemProps({ item, persistFocus });
    return (
        <styled.li {...rest} {...apiProps} ref={ref}>
            {isFunction(children) ? children(api.getItemState({ item, persistFocus })) : children}
        </styled.li>
    );
});

export const ItemLabel = forward<{}, 'span'>((props, ref) => {
    return <styled.span {...props} data-scope="select" data-part="item-label" ref={ref} />;
});

export const ItemIndicator = forward<select.ItemProps, 'span'>(
    ({ item, persistFocus, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.span
                {...rest}
                {...api.getItemIndicatorProps({ item, persistFocus })}
                ref={ref}
            />
        );
    },
);

export const ItemDeleteTrigger = forward<select.ItemProps, 'button'>(({ item, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.button
            {...rest}
            onClick={(e) => {
                e.stopPropagation();
                api.clearValue(item.value);
            }}
            data-scope="select"
            data-part="delete-item-trigger"
            ref={ref}
        />
    );
});
