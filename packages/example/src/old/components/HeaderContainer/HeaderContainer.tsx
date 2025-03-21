import { clsx } from '@optimacros-ui/utils';
import React from 'react';
import styles from './HeaderContainer.module.css';

interface Props {
    className?: string;
    children?: React.JSX.Element | React.JSX.Element[];
}

export const HeaderContainer = (props: Props) => {
    const className = clsx(styles.Container, props.className);

    return <div className={className}>{props.children}</div>;
};
