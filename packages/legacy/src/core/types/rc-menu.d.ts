declare module 'rc-menu' {
    import React from 'react';

    export default class BaseMenu extends React.Component<MenuProps> {}
    export class Item extends React.Component<MenuItemProps> {}
    export class SubMenu extends React.Component<SubMenuProps> {}
    export class MenuItemGroup extends React.Component<MenuItemGroupProps> {}
    export class Divider extends React.Component<DividerProps> {}

    type RenderIconType = React.ReactNode | ((props: any) => React.ReactNode);

    type OpenAnimation = string | Record<string, any>;

    interface MenuInfo {
        key: React.Key;
        keyPath: React.Key[];
        item: React.ReactInstance;
        domEvent: React.MouseEvent<HTMLElement>;
    }

    interface SelectInfo extends MenuInfo {
        selectedKeys?: React.Key[];
    }

    type OpenEventHandler = (
        keys:
            | React.Key[]
            | {
                  key: React.Key;
                  item: React.ReactInstance;
                  trigger: string;
                  open: boolean;
              },
    ) => void;

    type MenuClickEventHandler = (info: MenuInfo) => void;

    type DestroyEventHandler = (key: React.Key) => void;

    type SelectEventHandler = (info: SelectInfo) => void;

    type HoverEventHandler = (info: {
        key: React.Key;
        hover: boolean;
    }) => void;

    type MenuHoverEventHandler = (info: {
        key: React.Key;
        domEvent: React.MouseEvent<HTMLElement>;
    }) => void;

    type MenuMode = 'horizontal' | 'vertical' | 'vertical-left' | 'vertical-right' | 'inline';

    export type MenuProps = React.PropsWithChildren<{
        defaultSelectedKeys?: string[];
        defaultActiveFirst?: boolean;
        selectedKeys?: string[];
        defaultOpenKeys?: string[];
        openKeys?: string[];
        mode?: MenuMode;
        getPopupContainer?: (node: HTMLElement) => HTMLElement;
        onClick?: MenuClickEventHandler;
        onSelect?: SelectEventHandler;
        onDeselect?: SelectEventHandler;
        onDestroy?: DestroyEventHandler;
        openTransitionName?: string;
        openAnimation?: OpenAnimation;
        subMenuOpenDelay?: number;
        subMenuCloseDelay?: number;
        forceSubMenuRender?: boolean;
        triggerSubMenuAction?: string;
        level?: number;
        selectable?: boolean;
        multiple?: boolean;
        className?: string;
        style?: React.CSSProperties;
        activeKey?: string;
        prefixCls?: string;
        builtinPlacements?: Record<string, any>;
        itemIcon?: RenderIconType;
        expandIcon?: RenderIconType;
        overflowedIndicator?: React.ReactNode;
        onOpenChange?: OpenEventHandler;
    }>;

    export type SubMenuProps = React.PropsWithChildren<{
        parentMenu?: React.ReactElement & {
            isRootMenu: boolean;
            subMenuInstance: React.ReactInstance;
        };
        title?: React.ReactNode;
        selectedKeys?: string[];
        openKeys?: string[];
        onClick?: MenuClickEventHandler;
        onOpenChange?: OpenEventHandler;
        rootPrefixCls?: string;
        eventKey?: string;
        multiple?: boolean;
        active?: boolean;
        onItemHover?: HoverEventHandler;
        onSelect?: SelectEventHandler;
        triggerSubMenuAction?: string;
        onDeselect?: SelectEventHandler;
        onDestroy?: DestroyEventHandler;
        onMouseEnter?: MenuHoverEventHandler;
        onMouseLeave?: MenuHoverEventHandler;
        onTitleMouseEnter?: MenuHoverEventHandler;
        onTitleMouseLeave?: MenuHoverEventHandler;
        onTitleClick?: (info: {
            key: React.Key;
            domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
        }) => void;
        popupOffset?: number[];
        isOpen?: boolean;
        store?: {
            getState: () => any;
            setState: (state: any) => void;
        };
        mode?: MenuMode;
        manualRef?: (node: React.ReactInstance) => void;
        itemIcon?: RenderIconType;
        expandIcon?: RenderIconType;
        inlineIndent?: number;
        level?: number;
        subMenuOpenDelay?: number;
        subMenuCloseDelay?: number;
        forceSubMenuRender?: boolean;
        builtinPlacements?: Record<string, any>;
        disabled?: boolean;
        className?: string;
        popupClassName?: string;
    }>;

    export type MenuItemProps = React.PropsWithChildren<{
        attribute?: Record<string, string>;
        rootPrefixCls?: string;
        eventKey?: string;
        active?: boolean;
        selectedKeys?: string[];
        disabled?: boolean;
        title?: string;
        onItemHover?: HoverEventHandler;
        onSelect?: SelectEventHandler;
        onClick?: MenuClickEventHandler;
        onDeselect?: SelectEventHandler;
        parentMenu?: React.ReactInstance;
        onDestroy?: DestroyEventHandler;
        onMouseEnter?: MenuHoverEventHandler;
        onMouseLeave?: MenuHoverEventHandler;
        multiple?: boolean;
        isSelected?: boolean;
        manualRef?: (node: React.ReactInstance) => void;
        itemIcon?: RenderIconType;
        className?: string;
        style?: React.CSSProperties;
        role?: string;
        mode?: MenuMode;
        inlineIndent?: number;
        level?: number;
    }>;

    export type MenuItemGroupProps = React.PropsWithChildren<{
        renderMenuItem?: (
            item: React.ReactElement,
            index: number,
            key: string,
        ) => React.ReactElement;
        index?: number;
        className?: string;
        subMenuKey?: string;
        rootPrefixCls?: string;
        title?: string;
    }>;

    export type DividerProps = {
        className?: string;
        rootPrefixCls?: string;
        style?: React.CSSProperties;
    };
}
