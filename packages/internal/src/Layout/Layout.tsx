import { clsx } from '@optimacros-ui/utils';
import React from 'react';

import styles from './Layout.module.css';
import { styled } from '@optimacros-ui/store';

interface Props {
    width?: number;
    height?: number;
    row?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Layout: React.FC<Props> = (props) => {
    const { width, height, row, style, children, ...otherProps } = props;

    const className = clsx(
        {
            [styles.Layout]: true,
            [styles.Layout__row]: props.row,
        },
        props.className,
    );

    return (
        <styled.div
            {...otherProps}
            className={className}
            style={style}
            data-scope="layout"
            data-part="root"
        >
            {props.children}
        </styled.div>
    );
};
