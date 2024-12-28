import classNames from 'classnames';
import React from 'react';
import styles from './HeaderContainer.module.css';

interface Props {
    className?: string;
    children?: React.JSX.Element | React.JSX.Element[];
}

export const HeaderContainer = (props: Props) => {
    const className = classNames(styles.Container, props.className);

    return <div className={className}>{props.children}</div>;
};
