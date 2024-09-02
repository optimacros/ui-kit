import classNames from 'classnames'
import React from 'react'

import styles from './Tab.module.css'

export interface TabProps {
    counter?: number | undefined;
    maxCounter?: number | undefined;
    className?: string;
    title?: React.JSX.Element | string;
    onHeaderContextMenu?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    nonDraggable?: boolean;
    isFixed?: boolean;
    counterLink?: Record<string, any>;
    onDoubleClick?: () => void;
    icon?: React.JSX.Element | string;
    disabled?: boolean;
    label?: string;
}

export const Tab = (props: React.PropsWithChildren<TabProps>): React.JSX.Element => {
    const newClassName = classNames(styles.Tab, props.className)

    return (
        <div className={newClassName}>
            {props.children}
        </div>
    )
}
