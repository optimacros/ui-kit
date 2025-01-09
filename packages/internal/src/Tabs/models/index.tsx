import React from 'react';
import { TabProps } from '../components/Tab';

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

export interface TabsTheme extends TabsContainerTheme, TabContentTheme, TabHeaderTheme {}

export interface TabsContainerProps {
    active: number;
    children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
    className?: string;
    draggable?: boolean;
    onTabSwitch?: (index: number) => void;
    onTabPositionChange?: (newIndex: number, oldIndex: number) => void;
    hideTabHeader?: boolean;
    headerClassName?: string;
    contentClassName?: string;
    theme?: Partial<TabsContainerTheme>;
}
