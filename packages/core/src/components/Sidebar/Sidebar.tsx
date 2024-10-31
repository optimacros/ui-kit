import classNames from 'classnames';
import type { FC, ReactNode } from 'react';

import styles from './Sidebar.module.css';

export interface SidebarProps {
    children: ReactNode;
    className?: string;
}

export const Sidebar: FC<SidebarProps> = (props) => {
    const { children, className } = props;

    return <div className={classNames(styles.Container, className)}>{children}</div>;
};
