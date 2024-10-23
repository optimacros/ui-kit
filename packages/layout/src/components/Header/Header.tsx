import classNames from 'classnames';
import type { FC, ReactNode } from 'react';

import styles from './Header.module.css';

export interface HeaderProps {
    children: ReactNode;
    className?: string;
}

export const Header: FC<HeaderProps> = (props) => {
    const { children, className } = props;
    const classNameContainer = classNames(styles.Header, className);

    return <header className={classNameContainer}>{children}</header>;
};
