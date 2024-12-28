import classNames from 'classnames';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Component } from 'react';

import styles from './ProgressBars.module.css';

interface ProgressBar {
    start: () => void;
    stop: () => void;
    currentValue: number;
    maxValue: number;
}

interface Props {
    state: {
        currentProgressBar: ProgressBar;
        progressBars: ProgressBar[];
        currentIndex: number;
    };
    className?: string;
}

@observer
export class ProgressBars extends Component<Props> {
    render() {
        if (!this._state || !this._state.currentProgressBar) {
            return null;
        }

        const className = classNames(styles.ProgressBarsContainer, this.props.className);

        return <div className={className}>{this.renderProgressBars()}</div>;
    }

    renderProgressBars() {
        return _.map(this._state.progressBars, (progressBar, index) => {
            const { currentValue, maxValue } = progressBar;
            const needRenderMessage = index === this._state.currentIndex;
            const progress = `${Math.floor((currentValue * 100) / maxValue)}%`;

            return (
                <div key={index} className={styles.ProgressBarContainer}>
                    {needRenderMessage && (
                        <div className={styles.ProgressBarMessage}>
                            {currentValue} / {maxValue} ({progress})
                        </div>
                    )}

                    <div
                        className={styles.ProgressBar}
                        style={{
                            width: progress,
                        }}
                    />
                </div>
            );
        });
    }

    get _state() {
        return this.props.state;
    }
}
