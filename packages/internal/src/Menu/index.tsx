//@ts-nocheck

import React, { ReactNode, useId } from 'react';
import React, { MouseEventHandler, useId } from 'react';
import { Menu as MenuComponent } from '@optimacros-ui/menu';

interface MenuItemProps {
    title?: string;
    label?: string;
    value?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    children?: React.ReactNode;
    disabled?: boolean;
}

const normalizeChildren = (children: React.ReactNode): string =>
    React.isValidElement(children) ? children.props?.children : String(children);

export const MenuItem = ({ label, title, value, children, onClick, disabled }: MenuItemProps) => {
    const generatedKey = useId();

    return (
        <div onClick={onClick}>
            <MenuComponent.Item
                disabled={disabled}
                valueText={label || title || normalizeChildren(children)}
                value={value || generatedKey}
            />
        </div>
    );
};

export const SubMenu = ({ label, title, value, children }: MenuItemProps) => {
    const api = MenuComponent.useApi();
    const generatedKey = useId();

    return (
        <MenuComponent.SubMenuItem
            parent={api}
            item={{
                value: value || generatedKey,
                valueText: label || title || normalizeChildren(children),
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

export const Menu = (props: { children: ReactNode; renderTrigger?: () => ReactNode }) => {
    const { children, renderTrigger, ...rest } = props;

    return (
        <MenuComponent.Root
            closeOnSelect={false}
            open
            hoverable
            {...{ 'open.controlled': true }}
            {...rest}
        >
            {renderTrigger?.()}
            <MenuComponent.Positioner>
                <MenuComponent.Content size="sm">{children}</MenuComponent.Content>
            </MenuComponent.Positioner>
        </MenuComponent.Root>
    );
};
