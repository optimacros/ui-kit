import classNames from 'classnames';
import { Component } from 'react';
import { FontIcon } from 'ui-kit-core';
import type React from 'react';

import { WSCheckbox as Checkbox } from '../WSCheckbox';

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
                <Checkbox
                    theme={styles}
                    label={this.props.label}
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                >
                    <FontIcon className={styles.Icon} value={iconValue} />
                </Checkbox>
            </div>
        );
    }

    _onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
}
