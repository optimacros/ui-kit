import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { isFunction, tw } from '@optimacros-ui/utils';
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
    return <RootProvider {...context} state={state} />;
};

export const Indicator = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return <span {...api.getIndicatorProps()}>{children}</span>;
};

export const itemClassName = tw`py-2 px-3 data-highlighted:bg-[var(--bg-hover)] data-disabled:text-[var(--text-disabled)] cursor-pointer data-disabled:cursor-default select-none flex gap-1 align-center justify-start`;
export const Item = forward<menu.ItemProps, 'li'>(
    ({ valueText, closeOnSelect, disabled, value, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.li
                {...rest}
                {...api.getItemProps({ value, closeOnSelect, disabled, valueText })}
                ref={ref}
                className={itemClassName}
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
            <styled.li {...rest} {...parent.getTriggerItemProps(api)} className={itemClassName}>
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
                    <styled.li {...parent?.getTriggerItemProps(api)} className={itemClassName}>
                        {item.valueText}
                    </styled.li>
                    {isFunction(children) ? children(api) : children}
                </SubMenuRoot>
            )}
        </Root>
    );
});

export const separatorClassName = tw`h-px my-px text-[var(--text)]`;
export const Separator = () => {
    const api = useApi();

    return <hr {...api.getSeparatorProps()} className={separatorClassName} />;
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

export const groupLabelClassName = tw`px-2 py-2.5 border-b-1 border-solid border-[var(--border)]
bg-[var(--bg)] shadow-[var(--shadow)] 

text-primary
b


`;

export const GroupLabel = forward<menu.ItemGroupLabelProps & { children: ReactNode }, 'label'>(
    ({ children, htmlFor, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.label
                {...rest}
                ref={ref}
                {...api.getItemGroupLabelProps({ htmlFor })}
                className={groupLabelClassName}
            >
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
        <div key={item.value} {...api.getOptionItemProps(item)} className={itemClassName}>
            {item.valueText}
        </div>
    );
};

export const Positioner = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <Portal>
            <styled.div {...props} {...api.getPositionerProps()} ref={ref} />
        </Portal>
    );
});

export const SubMenuPositioner = forward<{}, 'div'>((props, ref) => {
    return <Positioner {...props} ref={ref} data-tag="sub-menu" />;
});

export const contentClassName = tw`
    data-[size="sm"]:w-5xs
    data-[size="sm"]:h-2xs

    data-[size="md"]:w-xs
    data-[size="md"]:h-sm

    data-[size="md"]:data-[orientation="horizontal"]:h-auto
    data-[size="md"]:data-[orientation="horizontal"]:w-sm

    border-1 border-solid border-[var(--border)]
    bg-[var(--bg)] shadow-[var(--shadow)]
    radius-sm text-md outline-none

    font-normal group
`;

export const Content = forward<
    { size?: 'sm' | 'md' | 'lg'; orientation?: 'vertical' | 'horizontal' },
    'div'
>(({ size = 'md', orientation = 'vertical', ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...rest}
            {...api.getContentProps()}
            data-size={size}
            data-orientation={orientation}
            ref={ref}
            className={contentClassName}
        />
    );
});

export const listClassName = tw`
    m-0 p-0 flex flex-col w-full h-full
    group-data-[orientation="horizontal"]:flex-row
    group-data-[orientation="horizontal"]:py-0
    group-data-[orientation="horizontal"]:overflow-x-scroll
    group-data-[orientation="vertical"]:overflow-y-scroll
    list-none
`;

export const List = forward<{ children: ReactNode }, 'ul'>(({ children, ...rest }, ref) => {
    return (
        <styled.ul {...rest} ref={ref} data-scope="menu" data-part="list" className={listClassName}>
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
