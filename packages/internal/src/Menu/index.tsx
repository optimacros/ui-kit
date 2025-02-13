import React, { MouseEventHandler, ReactNode, useId } from 'react';
import { Menu as MenuComponent } from '@optimacros-ui/menu';
import { forward } from '@optimacros-ui/store';

interface IMenuItem {
    title?: string;
    label?: string;
    value?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    children?: React.ReactNode;
    disabled?: boolean;
}

export const MenuItem = forward<IMenuItem, 'li'>(
    ({ label, title, value, children, onClick, ...restProps }, ref) => {
        const generatedKey = useId();

        return (
            <div onClick={onClick}>
                <MenuComponent.Item {...restProps} value={value || generatedKey} ref={ref}>
                    {label || title || children}
                </MenuComponent.Item>
            </div>
        );
    },
);

export const SubMenu = ({
    label,
    title,
    value,
    children,
}: {
    label?: string;
    title?: string;
    value?: string;
    children: ReactNode;
}) => {
    const api = MenuComponent.useApi();
    const generatedKey = useId();

    return (
        <MenuComponent.SubMenuItem
            parent={api}
            item={{
                value: value || generatedKey,
                valueText: label || title || (children as string),
                closeOnSelect: true,
            }}
            closeOnSelect={false}
            positioning={{
                fitViewport: false,
                overlap: false,
            }}
            hoverable
        >
            <MenuComponent.SubMenuPositioner>
                <MenuComponent.Content size="sm">{children}</MenuComponent.Content>
            </MenuComponent.SubMenuPositioner>
        </MenuComponent.SubMenuItem>
    );
};

export const MenuTrigger = MenuComponent.Trigger;

export const Menu = forward<
    { children: ReactNode; renderTrigger?: () => ReactNode } & MenuComponent.RootProps,
    'div'
>((props, ref) => {
    const { children, renderTrigger, ...rest } = props;

    return (
        <MenuComponent.Root
            closeOnSelect={false}
            open
            hoverable
            ref={ref}
            {...{ 'open.controlled': true }}
            {...rest}
        >
            {renderTrigger?.()}
            <MenuComponent.Positioner>
                <MenuComponent.Content size="sm">{children}</MenuComponent.Content>
            </MenuComponent.Positioner>
        </MenuComponent.Root>
    );
});
