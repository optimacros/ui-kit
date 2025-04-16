import { ComponentProps, ReactNode, ReactElement } from 'react';
import { Portal } from '@zag-js/react';
import { forward, styled } from '@optimacros-ui/store';
import { RootProvider, SubMenuContext, useApi, useState, useSubmenuApi } from './menu.machine';
import * as menu from '@zag-js/menu';

export { RootProvider as Root };

export const Indicator = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return <styled.span {...api.getIndicatorProps()}>{children}</styled.span>;
};

export const Item = forward<menu.ItemProps, 'li'>(
    ({ valueText, children, closeOnSelect, disabled, value, onClick, ...rest }, ref) => {
        const api = useApi();

        const props = api.getItemProps({ value, closeOnSelect, disabled, valueText, onClick });

        return (
            <styled.li {...props} {...rest} ref={ref} aria-disabled={disabled}>
                {children}
            </styled.li>
        );
    },
    {
        memoize: true,
    },
);

export const SubMenuItem = forward<menu.ItemProps, 'li'>(
    ({ children, value, closeOnSelect, disabled, valueText, onClick, ...rest }, ref) => {
        const subMenuApi = useSubmenuApi();
        const props = subMenuApi.getItemProps({ value, closeOnSelect, disabled, valueText });
        return (
            <styled.li {...rest} ref={ref} {...props} onClick={onClick}>
                {children}
            </styled.li>
        );
    },
);

export const SubMenuContent = forward<{ menu: ReturnType<typeof useState> }, 'div'>(
    ({ menu: machine, children, ...rest }, ref) => {
        return (
            <SubMenuContext.Provider value={machine}>
                <styled.div {...machine.api.getPositionerProps()} data-tag="sub-menu">
                    <styled.div {...machine.api.getContentProps()} ref={ref} {...rest}>
                        <List>{children}</List>
                    </styled.div>
                </styled.div>
            </SubMenuContext.Provider>
        );
    },
);

export const TriggerItem = forward<menu.ItemProps, 'li'>(({ children, ...rest }, ref) => {
    return (
        <styled.li {...rest} title={rest.valueText} ref={ref} role="menuitem">
            {children}
        </styled.li>
    );
});

export const Separator = () => {
    const api = useApi();

    return <styled.hr {...api.getSeparatorProps()} />;
};

export const OptionItem = ({
    children,
    renderIndicator,
    ...item
}: menu.OptionItemProps & { children: ReactNode; renderIndicator: () => ReactNode }) => {
    const api = useApi();

    return (
        <styled.div key={item.value} {...api.getOptionItemProps(item)}>
            {item.valueText}
        </styled.div>
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

export const ContextTrigger = forward<{ children: ReactNode }, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.button {...rest} {...api.getContextTriggerProps()} ref={ref} role="button">
                {children}
            </styled.button>
        );
    },
);

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
