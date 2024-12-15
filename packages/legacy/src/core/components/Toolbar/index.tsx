import classNames from 'classnames';
import React from 'react';

import styles from './Toolbar.module.css';

export type Props = {
    className?: string;
    align?: 'right' | 'center' | 'left' | 'rightInRow';
    small?: boolean;
};

export type ToolbarProps = React.PropsWithChildren<Props>;

export class Toolbar extends React.PureComponent<ToolbarProps> {
    render(): React.JSX.Element {
        const className = classNames(
            {
                [styles.Toolbar]: true,
                [styles.Toolbar__small]: this.props.small ?? false,
                [styles[`Toolbar__align_${this.props.align}`]]: this.props.align ?? 'left',
            },
            this.props.className,
        );

        return <div className={className}>{this.props.children}</div>;
    }
}
