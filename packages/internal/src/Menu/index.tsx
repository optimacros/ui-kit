import { Children, MouseEventHandler, ReactElement, ReactNode, useId } from 'react';
import type React from 'react';

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
    ({ label, title, value, children, onClick, key, ...restProps }, ref) => {
        const generatedKey = useId();

        return (
            <div onClick={onClick}>
                <MenuComponent.Item
                    {...restProps}
                    value={value || String(key) || generatedKey}
                    ref={ref}
                >
                    {label || title || children}
                </MenuComponent.Item>
            </div>
        );
    },
);

MenuItem.displayName = 'MenuItem';

export const SubMenu = ({
    label,
    title,
    value,
    children,
    parent: parentMenu,
}: {
    label?: string;
    title?: string;
    value?: string;
    children: Array<ReactNode>;
    parent?: ReturnType<typeof MenuComponent.useState>;
}) => {
    const parent = MenuComponent.useState();
    const generatedKey = useId();

    const menu = MenuComponent.useSubmenu(parentMenu ?? parent, {
        id: generatedKey,
        closeOnSelect: false,
        positioning: {
            fitViewport: false,
            overlap: false,
        },
        hoverable: true,
    });

    const childrenArr = Children.toArray(children) as Array<ReactElement>;

    return (
        <>
            <MenuComponent.TriggerItem {...menu.props} value={value || title || label}>
                {label || title}
            </MenuComponent.TriggerItem>
            <MenuComponent.SubMenuContent menu={menu}>
                {childrenArr
                    .filter(
                        (c) =>
                            //@ts-ignore
                            c.type.displayName === 'MenuItem' || c.type.displayName === 'SubMenu',
                    )
                    .map((c) => {
                        //@ts-ignore
                        if (c.type.displayName === 'SubMenu') {
                            return <SubMenu {...c.props} parent={menu} />;
                        }

                        return (
                            <MenuComponent.SubMenuItem
                                {...c.props}
                                value={c.props.value || c.props.label || c.props.title}
                            >
                                {c.props.children || c.props.label || c.props.title}
                            </MenuComponent.SubMenuItem>
                        );
                    })}
            </MenuComponent.SubMenuContent>
        </>
    );
};

SubMenu.displayName = 'SubMenu';

export const MenuTrigger = MenuComponent.Trigger;

export const Menu = forward<
    { children: ReactNode; renderTrigger?: () => ReactNode } & MenuComponent.Props,
    'div'
>((props, ref) => {
    const { children, renderTrigger, ...rest } = props;

    return (
        <MenuComponent.Root closeOnSelect={false} open hoverable {...rest}>
            {renderTrigger?.()}
            <MenuComponent.Positioner>
                <MenuComponent.Content ref={ref}>{children}</MenuComponent.Content>
            </MenuComponent.Positioner>
        </MenuComponent.Root>
    );
});

Menu.displayName = 'Menu';
