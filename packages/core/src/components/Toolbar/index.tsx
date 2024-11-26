import classNames from 'classnames';
import React from 'react';
import styles from './Toolbar.module.css';

export type Props = {
    className?: string;
    align?: 'right' | 'center' | 'left' | 'rightInRow';
    small?: boolean;
};

export type ToolbarProps = React.PropsWithChildren<Props>;

export const Toolbar: React.FC<ToolbarProps> = ({
    small = false,
    align = 'left',
    className,
    children,
}) => {
    const toolbarClassName = classNames(
        styles.Toolbar,
        {
            [styles.Toolbar__small]: small,
            [styles[`Toolbar__align_${align}`]]: align,
        },
        className,
    );

    return <div className={toolbarClassName}>{children}</div>;
};
