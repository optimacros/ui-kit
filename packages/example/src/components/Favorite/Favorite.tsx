import React, { Component } from 'react';
import classNames from 'classnames';

import { FontIcon } from '../FontIcon';

import styles from './Favorite.module.css';

interface Props {
    checked: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    className?: string;
}

export class Favorite extends Component<Props> {
    render() {
        const className = classNames(styles.Container, this.props.className);

        const iconValue = this.props.checked ? 'star' : 'star_border';

        return (
            <div className={className} onClick={this._onClick}>
                <FontIcon className={styles.Icon} value={iconValue} />
            </div>
        );
    }

    _onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        this.props.onChange(!this.props.checked);
    };
}
