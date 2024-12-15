import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';
import * as menu from '@zag-js/menu';
import { Portal } from '@zag-js/react';
import { ComponentProps, ReactNode, useEffect, useMemo } from 'react';

const initialState = {
    disabled: false,
    parent: null,
};

export const { Api, useApi, State, useMachine, RootProvider, useSelector } =
    createReactApiStateContext({
        id: 'menu',
        initialState,
        api: null as menu.Api,
        machine: menu,
        useExtendApi(state, api) {
            return {
                ...state,
                ...api,
                setParentNode(parent: typeof api) {
                    api.setParent(parent.machine);
                    parent.setChild(api.machine);
                },
            };
        },
    });

export const Root = ({
    state = initialState,
    ...context
}: { state: typeof initialState } & ComponentProps<typeof RootProvider>) => {
    return <RootProvider typeahead={false} {...context} state={state} />;
};

export const Indicator = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return <span {...api.getIndicatorProps()}>{children}</span>;
};

export const Item = forward<menu.ItemProps, 'li'>(
    ({ valueText, closeOnSelect, disabled, value, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.li
                {...rest}
                {...api.getItemProps({ value, closeOnSelect, disabled, valueText })}
                ref={ref}
            >
                {valueText}
            </styled.li>
        );
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

export const Group = forward<menu.ItemGroupProps & { children: ReactNode }, 'ul'>(
    ({ children, id, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.ul ref={ref} {...rest} {...api.getItemGroupProps({ id })}>
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

export const Content = forward<
    { size?: 'sm' | 'md' | 'lg'; orientation?: 'vertical' | 'horizontal' },
    'div'
>(({ size, orientation = 'vertical', ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...rest}
            {...api.getContentProps()}
            data-size={size}
            data-orientation={orientation}
            ref={ref}
        />
    );
});

export const List = forward<{ children: ReactNode }, 'ul'>(({ children, ...rest }, ref) => {
    return (
        <styled.ul {...rest} ref={ref} data-scope="menu" data-part="list">
            {children}
        </styled.ul>
    );
});

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children }, ref) => {
    const api = useApi();
    const disabled = api.disabled;

    const props = useMemo(
        () => ({ ...api.getTriggerProps(), disabled }),
        [api.getTriggerProps, disabled],
    );

    return (
        <styled.button {...props} ref={ref}>
            {children}
        </styled.button>
    );
});
