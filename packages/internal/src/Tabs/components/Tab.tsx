import React, { memo } from 'react';

export interface TabProps {
    children: React.ReactNode;
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

export const Tab = memo<TabProps>((props) => {
    return null;
});
