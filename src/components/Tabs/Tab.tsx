import classNames from 'classnames'
import React from 'react'

import styles from './Tab.module.css'

interface Props {
    // eslint-disable-next-line react/no-unused-prop-types
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

export const Tab: React.FC<Props> = ({ children, className }) => {
    const newClassName = classNames(styles.Tab, className)

    return <div className={newClassName}>{children}</div>
}

