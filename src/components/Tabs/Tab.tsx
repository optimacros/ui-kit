import React from 'react'
import classNames from 'classnames'

import styles from './Tab.module.css'

interface Props {
    // eslint-disable-next-line react/no-unused-prop-types
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

const Tab: React.FC<Props> = ({ children, className }) => {
    const newClassName = classNames(styles.Tab, className)

    return (
        <div className={newClassName}>
            {children}
        </div>
    )
}

export default Tab
