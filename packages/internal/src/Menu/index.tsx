import React, { useId } from 'react';
import { Menu as MenuComponent } from '@optimacros-ui/menu';

interface Props {
    title: string;
    key: string;
    label?: string;
    onClick: (event: MouseEvent) => void;
    children: React.ReactNode;
}

export const MenuItem = (props: Props) => {
    const { label, title, children, onClick, key, ...restProps } = props;
    const content = label || title;
    const generatedKey = useId();

    return (
        <div onClick={onClick}>
            <MenuComponent.Item
                {...restProps}
                valueText={content || children}
                value={key || content || generatedKey}
                key={key || content || generatedKey}
            />
        </div>
    );
};

export const SubMenu = ({ label, title, key, children }) => {
    const api = MenuComponent.useApi();

    return (
        <MenuComponent.SubMenuItem
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
            <MenuComponent.SubMenuPositioner>
                <MenuComponent.Content size="sm">{children}</MenuComponent.Content>
            </MenuComponent.SubMenuPositioner>
        </MenuComponent.SubMenuItem>
    );
};

export const Menu = (props: Props) => {
    const { children } = props;

    return (
        <MenuComponent.Root
            closeOnSelect={false}
            {...props}
            open={true}
            {...{ 'open.controlled': true }}
        >
            <MenuComponent.Positioner>
                <MenuComponent.Content size="sm">{children}</MenuComponent.Content>
            </MenuComponent.Positioner>
        </MenuComponent.Root>
    );
};
