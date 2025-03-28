import { Component } from 'react';
import { clsx } from '@optimacros-ui/utils';
import type React from 'react';

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
        const className = clsx(styles.Container, this.props.className);

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
