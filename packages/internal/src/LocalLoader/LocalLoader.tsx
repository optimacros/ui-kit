import { PureComponent } from 'react';
import { ProgressBar } from '../Loader';

import styles from './LocalLoader.module.css';
import { clsx } from '@optimacros-ui/utils';
import { styled } from '@optimacros-ui/store';

interface Props {
    centered?: boolean;
    height?: string;
}

export class LocalLoader extends PureComponent<Props> {
    render() {
        return (
            <styled.div
                className={this.classes}
                style={this.style}
                data-scope="local-loader"
                data-part="root"
            >
                <ProgressBar theme={styles} type="circular" {...this.props} />
            </styled.div>
        );
    }

    get classes() {
        const { centered } = this.props;

        return clsx({
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
