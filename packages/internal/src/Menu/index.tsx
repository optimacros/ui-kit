import { Children, MouseEventHandler, ReactElement, ReactNode, useId } from 'react';
import type React from 'react';

import { Menu as MenuComponent } from '@optimacros-ui/menu';
import { forward } from '@optimacros-ui/store';
import { FontIcon } from '@optimacros-ui/font-icon';

import './styles.css';
import { clsx } from '@optimacros-ui/utils';

interface IMenuItem {
    title?: string;
    label?: string;
    value?: string;
    onClick?: MouseEventHandler<HTMLLIElement>;
    children?: React.ReactNode;
    disabled?: boolean;
}

export const MenuItem = forward<IMenuItem, 'li'>(
    (
        { label, title, value, children, onClick, id, className: classNameProp, ...restProps },
        ref,
    ) => {
        const generatedKey = useId();

        const className = clsx(classNameProp, 'menuItem');

        return (
            <MenuComponent.Item
                onClick={onClick}
                id={id ?? value ?? generatedKey}
                key={id ?? value ?? generatedKey}
                {...restProps}
                value={value ?? generatedKey}
                ref={ref}
                className={className}
            >
                {label || title || children}
            </MenuComponent.Item>
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
    title?: ReactNode;
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
            offset: { mainAxis: 4 },
        },
        hoverable: true,
    });

    const childrenArr = Children.toArray(children) as Array<ReactElement>;

    return (
        <>
            <MenuComponent.TriggerItem
                {...menu.props}
                value={value || (typeof title === 'string' && title) || label || generatedKey}
                key={generatedKey}
            >
                {label || title}
                <FontIcon value="arrow_right" data-tag="submenu-icon" />
            </MenuComponent.TriggerItem>
            <MenuComponent.SubMenuContent menu={menu}>
                {childrenArr.map((c, i) => {
                    //@ts-ignore
                    if (c.type.displayName === 'SubMenu') {
                        return <SubMenu {...c.props} parent={menu} />;
                    }
                    //@ts-ignore
                    if (c.type.displayName === 'MenuItem') {
                        const value =
                            c.props.value ||
                            c.props.label ||
                            c.props.title ||
                            `${generatedKey}${i}`;
                        return (
                            <MenuComponent.SubMenuItem {...c.props} value={value} key={value}>
                                {c.props.children || c.props.label || c.props.title}
                            </MenuComponent.SubMenuItem>
                        );
                    }
                    return c;
                })}
            </MenuComponent.SubMenuContent>
        </>
    );
};

SubMenu.displayName = 'SubMenu';

export const MenuTrigger = MenuComponent.Trigger;
export type MenuProps = {
    children: ReactNode;
    renderTrigger?: () => ReactNode;
    onlyContent?: boolean;
} & MenuComponent.Props;

export const Menu = forward<MenuProps, 'div'>((props, ref) => {
    const { children, renderTrigger, onlyContent, ...rest } = props;

    if (onlyContent) {
        return (
            <div data-scope="menu" data-part="root">
                {children}
            </div>
        );
    }

    return (
        <div data-scope="menu" data-part="root">
            <MenuComponent.Root closeOnSelect={false} open hoverable {...rest}>
                {renderTrigger?.()}
                <MenuComponent.Positioner portalled>
                    <MenuComponent.Content className="menu-content" ref={ref}>
                        {children}
                    </MenuComponent.Content>
                </MenuComponent.Positioner>
            </MenuComponent.Root>
        </div>
    );
});

Menu.displayName = 'Menu';
