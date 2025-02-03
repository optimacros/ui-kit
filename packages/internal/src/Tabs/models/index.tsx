import React, { ReactElement } from 'react';
import { Tabs } from '@optimacros-ui/tabs';

export interface TabsProps {
    className?: string;
    draggable?: boolean;
    onTabSwitch?: (index: number) => void;
    onTabPositionChange?: (newTabs: TabProps[]) => void;
    hideTabHeader?: boolean;
    headerClassName?: string;
    contentClassName?: string;
    theme?: Partial<TabsTheme>;
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
    active?: number;
    onChange?: (index: number) => void;
}

export interface TabsContainerTheme {
    TabsContainer: string;
}

export interface TabContentTheme {
    TabContent: string;
    TabContent_Inner: string;
}

export interface TabHeaderTheme {
    TabHeaderContainer: string;
    TabButton: string;
    TabButton_Inner: string;
    TabButton_Content: string;
    TabButton__active: string;
    TabButton__disabled: string;
    TabButton__draggable: string;
}

export type TabsTheme = Partial<TabsContainerTheme & TabContentTheme & TabHeaderTheme>;

export interface TabProps {
    children?: React.ReactNode;
    counter?: number | undefined;
    maxCounter?: number | undefined;
    className?: string;
    title?: React.JSX.Element | string;
    onHeaderContextMenu?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    nonDraggable?: boolean;
    isFixed?: boolean;
    onDoubleClick?: () => void;
    icon?: React.JSX.Element | string;
    disabled?: boolean;
    label?: string;
}

export interface TabExtended extends Tabs.Tab {
    meta: TabProps;
}
