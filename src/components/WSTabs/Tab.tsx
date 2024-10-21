import classNames from 'classnames';
import React from 'react';

import styles from './Tab.module.css';

interface Props {
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

export const WSTab: React.FC<Props> = ({ children, className }) => {
    const newClassName = classNames(styles.Tab, className);

    return <div className={newClassName}>{children}</div>;
};
