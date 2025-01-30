import { forward, styled } from '@optimacros-ui/store';
import { ComponentProps, PropsWithChildren, ReactNode, useCallback, useEffect } from 'react';
import { Menu as BaseMenu } from '@optimacros-ui/menu';
import { Draggable as DraggableComponent } from '@optimacros-ui/draggable';
import { Tab } from './models';
import { RootProvider, useApi, useProxySelector, useSelector } from './state';

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>> & {
    variant?: 'primary' | 'secondary';
};
const BaseRoot = forward<RootProps, 'div'>(
    ({ children, variant, className, tabs, value: valueProp, ...rest }, ref) => {
        const rootProps = useSelector((api) => api.getRootProps());
        const { setTabs, setValue } = useSelector((api) => api);

        useEffect(() => {
            setTabs(tabs);
        }, [tabs]);

        useEffect(() => {
            setValue(valueProp);
        }, [valueProp]);

        return (
            <styled.div
                {...rest}
                {...rootProps}
                ref={ref}
                data-variant={variant}
                className={className}
            >
                {children}
            </styled.div>
        );
    },
);

export const Root = forward<RootProps, 'div'>(
    ({ children, variant, className, tabs, value, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                <BaseRoot variant={variant} ref={ref} tabs={tabs} value={value}>
                    {children}
                </BaseRoot>
            </RootProvider>
        );
    },
);

export const List = forward<{ children: (tabs: Tab[]) => ReactNode }, 'ul'>(
    ({ children, ...rest }, ref) => {
        const listProps = useProxySelector((api) => api.getListProps());
        const { draggable, handleDragEnd, tabs } = useApi();

        if (draggable) {
            return (
                <DraggableComponent.Root
                    onDragEnd={(event) =>
                        handleDragEnd(event.active.data.current as Tab, event.delta.x)
                    }
                >
                    <styled.ul {...listProps} {...rest} ref={ref}>
                        {children(tabs)}
                    </styled.ul>
                </DraggableComponent.Root>
            );
        }

        return (
            <styled.ul {...listProps} {...rest} ref={ref}>
                {children(tabs)}
            </styled.ul>
        );
    },
);

export const Trigger = forward<
    { children: ReactNode } & Pick<Tab, 'id' | 'disabled' | 'fixed'>,
    'li'
>(({ id, disabled, fixed, ...rest }, ref) => {
    const api = useApi();

    const handleClick = useCallback(() => {
        api.open(id);
    }, [id]);

    const apiProps = {
        ...api.getTriggerProps({ id, disabled, fixed }),
        onClick: handleClick,
    };

    return <styled.li {...rest} {...apiProps} ref={ref} key={id} />;
});

export const DraggableTrigger = forward<
    { children: ReactNode; nonDraggable?: boolean } & Pick<Tab, 'id' | 'disabled' | 'fixed'>,
    'li'
>(({ id, disabled, fixed, nonDraggable = false, ...rest }, ref) => {
    const api = useApi();

    const apiProps = api.getTriggerProps({ id, disabled, fixed });

    return (
        <DraggableComponent.Item
            id={id}
            ref={ref}
            data={{ id, disabled, fixed }}
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
                            apiProps.onClick(e);
                            listeners.onPointerDown(e);
                        }}
                        ref={setNodeRef}
                        key={id}
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
                                key={id}
                                data-dragging={isDragging}
                            />
                        </DraggableComponent.DragOverlay>
                    )}
                </>
            )}
        </DraggableComponent.Item>
    );
});

export const ContentContainer = forward<{ children: (tab: Tab) => ReactNode }, 'div'>(
    ({ children }, ref) => {
        const activeTab = useSelector((api) => api.getActiveTab());

        return (
            <styled.div data-scope="tabs" data-role="content-container" ref={ref}>
                {activeTab && children(activeTab)}
            </styled.div>
        );
    },
);

export const Content = forward<{ children: ReactNode }, 'div'>(({ id, ...rest }, ref) => {
    const api = useApi();

    return <styled.div {...rest} {...api.getContentProps({ value: id })} ref={ref} />;
});

export const Menu = BaseMenu;
