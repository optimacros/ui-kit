import { ComponentProps, ReactNode, useEffect, FC, PropsWithChildren, ReactElement } from 'react';
import { Portal } from '@zag-js/react';
import { forward, styled } from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';
import { RootProvider, useApi, useProxySelector, useFeatureFlags, useState } from './menu.machine';
import type * as menu from '@zag-js/menu';

export { RootProvider as Root };

export type RootProps = ComponentProps<typeof RootProvider>;

export const Indicator = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return <span {...api.getIndicatorProps()}>{children}</span>;
};

export const Item = forward<menu.ItemProps, 'li'>(
    ({ valueText, children, closeOnSelect, disabled, value, ...rest }, ref) => {
        const props = useProxySelector(
            ({ api }) => api.getItemProps({ value, closeOnSelect, disabled, valueText }),
            [value, closeOnSelect, disabled, valueText],
        );

        return (
            <styled.li {...rest} {...props} ref={ref}>
                {children}
            </styled.li>
        );
    },
    {
        memoize: true,
    },
);

export const NestedItem = forward<{ children: ReactNode; parent: ReturnType<typeof useApi> }, 'li'>(
    ({ children, parent, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.li {...rest} ref={ref} {...parent.getTriggerItemProps(api)}>
                {children}
            </styled.li>
        );
    },
);

const SubMenuRoot: FC<PropsWithChildren<{ parent: ReturnType<typeof useState> }>> = ({
    parent,
    children,
}) => {
    const api = useApi();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (api && parent) {
                api.setParentNode(parent);
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return children;
};

export const SubMenuItem = forward<
    { item: menu.ItemProps; parent: ReturnType<typeof useState> } & RootProps,
    'li'
>(({ item, parent, children, ...rest }, ref) => {
    const isEnabled = useFeatureFlags('submenu');

    if (!isEnabled) {
        console.warn('submenu feature is disabled');
        return (
            <Item {...item} {...rest}>
                {/*@ts-ignore*/}
                {children}
            </Item>
        );
    }

    return (
        <RootProvider {...rest}>
            {(state) => (
                <SubMenuRoot parent={parent}>
                    <styled.li
                        {...parent.api?.getTriggerItemProps(state.api)}
                        title={item.valueText}
                        ref={ref}
                    >
                        {item.valueText}
                    </styled.li>
                    {isFunction(children) ? children(state) : children}
                </SubMenuRoot>
            )}
        </RootProvider>
    );
});

export const Separator = () => {
    const api = useApi();

    return <hr {...api.getSeparatorProps()} />;
};

export const OptionItem = ({
    children,
    renderIndicator,
    ...item
}: menu.OptionItemProps & { children: ReactNode; renderIndicator: () => ReactNode }) => {
    const api = useApi();

    return (
        <div key={item.value} {...api.getOptionItemProps(item)}>
            {item.valueText}
        </div>
    );
};

export const Positioner = forward<{ portalled?: boolean }, 'div'>(({ portalled, ...rest }, ref) => {
    const api = useApi();

    const positioner = <styled.div {...rest} {...api.getPositionerProps()} ref={ref} />;

    return portalled ? <Portal>{positioner}</Portal> : positioner;
});

export const SubMenuPositioner = forward<ComponentProps<typeof Positioner>, 'div'>((props, ref) => {
    return <Positioner {...props} ref={ref} data-tag="sub-menu" />;
});

export const Content = forward<{ size?: 'sm' | 'md' | 'lg' }, 'div'>(({ size, ...rest }, ref) => {
    const api = useApi();

    return <styled.div {...rest} {...api.getContentProps()} data-size={size} ref={ref} />;
});

export const List = forward<{ children: ReactNode | ReactElement }, 'ul'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.ul {...rest} ref={ref} data-scope="menu" data-part="list">
                {children}
            </styled.ul>
        );
    },
);

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.button {...rest} {...api.getTriggerProps()} ref={ref} role="button">
            {children}
        </styled.button>
    );
});

export const Group = forward<menu.ItemGroupProps & { children: ReactNode }, 'ul'>(
    ({ children, id, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.ul
                ref={ref}
                {...rest}
                {...api.getItemGroupProps({ id })}
                data-orientation={api.orientation}
            >
                {children}
            </styled.ul>
        );
    },
);

export const GroupLabel = forward<menu.ItemGroupLabelProps & { children: ReactNode }, 'label'>(
    ({ children, htmlFor, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.label {...rest} ref={ref} {...api.getItemGroupLabelProps({ htmlFor })}>
                {children}
            </styled.label>
        );
    },
);
