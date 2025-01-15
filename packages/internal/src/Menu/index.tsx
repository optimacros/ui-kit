import React from 'react';
import { Menu } from '@optimacros-ui/menu';

interface Props {
    title: string;
    key: string;
    label?: string;
    onClick: (event: MouseEvent) => void;
    children: React.ReactNode;
}

export const WSMenuItem = (props: Props) => {
    const { label, title, children, onClick, ...restProps } = props;

    return (
        <div onClick={onClick}>
            <Menu.Item
                {...restProps}
                valueText={label || title}
                value={label || title || children}
                key={label || title || children}
            />
        </div>
    );
};

export const WSSubMenu = ({ label, title, key, children }) => {
    const api = Menu.useApi();

    return (
        <Menu.SubMenuItem
            key={key}
            parent={api}
            item={{
                value: label || title || children,
                valueText: label || title,
                closeOnSelect: true,
            }}
            closeOnSelect={false}
            positioning={{
                fitViewport: false,
                overlap: false,
            }}
        >
            <Menu.SubMenuPositioner>
                <Menu.Content size="sm">{children}</Menu.Content>
            </Menu.SubMenuPositioner>
        </Menu.SubMenuItem>
    );
};

export const WSMenu = (props: Props) => {
    const { children } = props;

    return (
        <Menu.Root closeOnSelect={false} {...props} open={true} {...{ 'open.controlled': true }}>
            <Menu.Positioner>
                <Menu.Content size="sm">{children}</Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
};
