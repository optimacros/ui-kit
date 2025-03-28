import type React from 'react';

import styles from './Tab.module.css';

interface Props {
    // eslint-disable-next-line react/no-unused-prop-types
    title?: string;
    className?: string;
    children?: React.ReactNode;
    isFixed?: boolean;
}

export const WSTab: React.FC<Props> = ({ children, className }) => {
    const newClassName = `${styles.Tab} ${className || ''}`.trim();

    return <div className={newClassName}>{children}</div>;
};
