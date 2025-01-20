import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';
import { Portal } from '@zag-js/react';
import { ComponentProps, ReactNode, useEffect } from 'react';
import { machine } from './menu.machine';
import type * as menu from '@zag-js/menu';

export const {
    Api,
    useApi,
    RootProvider: Root,
    useSelector,
    useProxySelector,
} = createReactApiStateContext({
    id: 'menu',
    machine,
    connect(api, { state, send }, machine) {
        return {
            ...api,
            orientation: state.context.orientation,
            setOrientation(orientation) {
                send({ type: 'ORIENTATION.SET', value: orientation });
            },
            getContentProps() {
                return { ...api.getContentProps(), 'data-orientation': state.context.orientation };
            },
            getTriggerProps() {
                const props = api.getTriggerProps();
                return {
                    ...props,
                    onClick: (e) => {
                        if (!state.context.disabled && !state.context.isHoverTrigger) {
                            props.onClick(e);
                        }
                    },
                    'data-disabled': state.context.disabled ?? undefined,
                };
            },
            setParentNode: (parent) => {
                api.setParent(parent.machine);
                parent.setChild(machine);
            },
            getTriggerItemProps(parent) {
                const props = api.getTriggerItemProps(parent);

                return {
                    ...props,
                    // some zagjs shit
                    'data-disabled': props['data-disabled'] === true ? true : undefined,
                };
            },
        };
    },
});

export const Indicator = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return <span {...api.getIndicatorProps()}>{children}</span>;
};

export const Item = forward<menu.ItemProps, 'li'>(
    ({ valueText, closeOnSelect, disabled, value, ...rest }, ref) => {
        const props = useProxySelector(
            (api) => api.getItemProps({ value, closeOnSelect, disabled, valueText }),
            [value, closeOnSelect, disabled, valueText],
        );

        return (
            <styled.li {...rest} {...props} ref={ref}>
                {valueText}
            </styled.li>
        );
    },
    {
        memoize: true,
    },
);

export const NestedItem = forward<{ children: ReactNode; parent: ReturnType<typeof useApi> }, 'li'>(
    ({ children, parent, ...rest }) => {
        const api = useApi();

        return (
            <styled.li {...rest} {...parent.getTriggerItemProps(api)}>
                {children}
            </styled.li>
        );
    },
);

const SubMenuRoot = forward<{ parent: ReturnType<typeof useApi> }, 'li'>(({ parent, children }) => {
    const api = useApi();

    useEffect(() => {
        api && parent && api.setParentNode(parent);
    }, []);

    return children;
});

export const SubMenuItem = forward<
    { item: menu.ItemProps; parent: ReturnType<typeof useApi> } & ComponentProps<typeof Root>,
    'li'
>(({ item, parent, children, ...rest }) => {
    return (
        <Root {...rest}>
            {(api) => (
                <SubMenuRoot parent={parent}>
                    <styled.li {...parent?.getTriggerItemProps(api)}>{item.valueText}</styled.li>
                    {isFunction(children) ? children(api) : children}
                </SubMenuRoot>
            )}
        </Root>
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
    const contentProps = useSelector((state) => state.getContentProps());

    return <styled.div {...rest} {...contentProps} data-size={size} ref={ref} />;
});

export const List = forward<{ children: ReactNode }, 'ul'>(({ children, ...rest }, ref) => {
    return (
        <styled.ul {...rest} ref={ref} data-scope="menu" data-part="list">
            {children}
        </styled.ul>
    );
});

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }, ref) => {
    const props = useSelector((state) => state.getTriggerProps());

    return (
        <styled.button {...rest} {...props} ref={ref}>
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
