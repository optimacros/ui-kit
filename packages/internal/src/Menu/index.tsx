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
    eventKey?: any;
}

export const MenuItem = forward<IMenuItem, 'li'>(
    (
        {
            label,
            title,
            value,
            children,
            onClick,
            id,
            className: classNameProp,
            eventKey,
            ...restProps
        },
        ref,
    ) => {
        const generatedKey = useId();

        return (
            <MenuComponent.Item
                key={id ?? value ?? generatedKey}
                {...restProps}
                onClick={onClick}
                value={value ?? generatedKey}
                ref={ref}
                className={classNameProp}
                data-testid="menu-item"
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
    className: classNameProp,
    hoverable = true,
    ...rest
}: {
    label?: string;
    title?: ReactNode;
    value?: string;
    children: Array<ReactNode>;
    parent?: ReturnType<typeof MenuComponent.useState>;
    className?: string;
    hoverable?: boolean;
}) => {
    const parent = MenuComponent.useState();
    const generatedKey = useId();

    const menu = MenuComponent.useSubmenu(parentMenu ?? parent, {
        id: generatedKey,
        closeOnSelect: false,
        positioning: {
            fitViewport: true,
            overlap: false,
            offset: { mainAxis: 4 },
        },
        hoverable,
    });

    const childrenArr = Children.toArray(children) as Array<ReactElement>;

    const className = clsx(classNameProp, menu.api.open && 'active');

    return (
        <>
            <MenuComponent.TriggerItem
                {...rest}
                {...menu.props}
                value={value || (typeof title === 'string' && title) || label || generatedKey}
                key={generatedKey}
                className={className}
                data-testid="menu-item"
            >
                {label || title}
                <FontIcon value="arrow_right" data-tag="submenu-icon" />
            </MenuComponent.TriggerItem>
            <MenuComponent.SubMenuContent menu={menu} data-testid="submenu">
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
                            <MenuComponent.SubMenuItem
                                {...c.props}
                                value={value}
                                key={value}
                                data-testid="menu-item"
                            >
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
    portalled?: boolean;
    contentClassName?: string;
} & MenuComponent.Props;

export const Menu = forward<MenuProps, 'div'>((props, ref) => {
    const {
        children,
        renderTrigger,
        onlyContent,
        portalled = true,
        contentClassName,
        ...rest
    } = props;

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

                <MenuComponent.Positioner portalled={portalled}>
                    <MenuComponent.Content
                        className={clsx('menu-content', contentClassName)}
                        ref={ref}
                        data-testid="menu"
                    >
                        {children}
                    </MenuComponent.Content>
                </MenuComponent.Positioner>
            </MenuComponent.Root>
        </div>
    );
});

Menu.displayName = 'Menu';
