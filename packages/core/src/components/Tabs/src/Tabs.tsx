import { forward, styled } from '@optimacros-ui/store';
import { PropsWithChildren, ReactNode, useId, useRef } from 'react';
import { Menu as BaseMenu } from '@optimacros-ui/menu';
import { Draggable as DraggableComponent } from '@optimacros-ui/draggable';
import { RootProvider, useApi, Props } from './state';
import { Tab } from './types';

export const getTabIndex = (value: string) =>
    parseInt(document.querySelector(`[data-value="${value}"]`).getAttribute('data-index'));

export type RootProps = PropsWithChildren<Props> & {
    variant?: 'primary' | 'secondary';
};
const BaseRoot = forward<RootProps, 'div'>(({ children, variant, className, ...rest }, ref) => {
    const { getRootProps } = useApi();

    const rootProps = getRootProps();

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

export const Trigger = forward<{ children: ReactNode } & Tab, 'li'>(
    ({ value, disabled, fixed, index, ...rest }, ref) => {
        const api = useApi();

        const apiProps = api.getTriggerProps({ value, disabled, fixed, index });

        return <styled.li {...rest} {...apiProps} ref={ref} key={`trigger-${value}`} />;
    },
);

export const DraggableTrigger = forward<
    { children: ReactNode; nonDraggable?: boolean } & Tab,
    'li'
>(({ value, disabled, fixed, nonDraggable = false, index, ...rest }, ref) => {
    const id = useId();

    const api = useApi();

    const apiProps = api.getTriggerProps({ value, disabled, fixed });

    return (
        <DraggableComponent.Item
            id={id}
            ref={ref}
            data={{ value, disabled, fixed, index }}
            disabled={nonDraggable}
        >
            {({ setNodeRef, transform, attributes, listeners, isDragging, id: draggableId }) => (
                <>
                    <styled.li
                        {...rest}
                        {...attributes}
                        {...apiProps}
                        data-dragging={isDragging}
                        data-draggable-id={draggableId}
                        onPointerDown={(e) => {
                            //@ts-ignore
                            apiProps?.onClick?.(e);
                            listeners?.onPointerDown?.(e);
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

export const List = forward<{ children: ReactNode }, 'ul'>((props, externalRef) => {
    const { draggable, handleDragEnd, getListProps } = useApi();

    const internalRef = useRef<HTMLUListElement>(null);

    const ref = externalRef ?? internalRef;

    //@ts-ignore
    const listProps = getListProps({ element: ref.current });

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
    const { hiddenTabs, open } = useApi();

    return hiddenTabs.map((tab) =>
        children({
            ...tab,
            //@ts-ignore
            onClickCapture: () => open(tab.value),
        }),
    );
});
