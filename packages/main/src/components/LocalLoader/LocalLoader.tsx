import classNames from 'classnames';
import React from 'react';
import { ProgressBar } from '@optimacros/ui-kit-core';

import styles from './LocalLoader.module.css';

interface Props {
    centered?: boolean;
    height?: string;
}

export class LocalLoader extends React.PureComponent<Props> {
    render() {
        return (
            <div className={this.classes} style={this.style}>
                <ProgressBar theme={styles} type="circular" {...this.props} />
            </div>
        );
    }

    get classes() {
        const { centered } = this.props;

        return classNames({
            [styles.Container]: true,
            [styles.Container_centered]: centered,
        });
    }

    get style() {
        const { height } = this.props;

        if (height) {
            return {
                minHeight: height,
            };
        }

        return {};
    }
}
