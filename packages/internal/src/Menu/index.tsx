//@ts-nocheck

import React, { ReactNode, useId } from 'react';
import { Menu as MenuComponent } from '@optimacros-ui/menu';

interface Props {
    title: string;
    key: string;
    label?: string;
    value?: string;
    onClick: (event: MouseEvent) => void;
    children: React.ReactNode;
}

export const MenuItem = ({ label, title, value, children, onClick, ...restProps }: Props) => {
    const generatedKey = useId();

    return (
        <div onClick={onClick}>
            <MenuComponent.Item
                {...restProps}
                valueText={label || title || children}
                value={value || generatedKey}
            />
        </div>
    );
};

export const SubMenu = ({ label, title, value, children }) => {
    const api = MenuComponent.useApi();
    const generatedKey = useId();

    return (
        <MenuComponent.SubMenuItem
            parent={api}
            item={{
                value: value || generatedKey,
                valueText: label || title || children,
                closeOnSelect: true,
            }}
            closeOnSelect={false}
            positioning={{
                fitViewport: false,
                overlap: false,
            }}
        >
            <MenuComponent.SubMenuPositioner>
                <MenuComponent.Content size="sm">{children}</MenuComponent.Content>
            </MenuComponent.SubMenuPositioner>
        </MenuComponent.SubMenuItem>
    );
};

export const Menu = (props: { children: ReactNode }) => {
    const { children } = props;

    return (
        <MenuComponent.Root
            closeOnSelect={false}
            {...props}
            open={true}
            {...{ 'open.controlled': true }}
        >
            <MenuComponent.Positioner>
                <MenuComponent.Content>{children}</MenuComponent.Content>
            </MenuComponent.Positioner>
        </MenuComponent.Root>
    );
};
