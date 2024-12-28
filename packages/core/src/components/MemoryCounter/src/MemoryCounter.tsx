import classNames from 'classnames';
import { FC } from 'react';
import { Icon } from '@optimacros-ui/icon';

import { MemoryData } from './types';

import styles from './MemoryCounter.module.css';

interface SpaceCounterProps {
    data: MemoryData;
    className?: string;
}

export const MemoryCounter: FC<SpaceCounterProps> = (props) => {
    const { data, className } = props;
    const { filledSize, percentSize, freeSize, doubleFreeSize } = data;

    const styleValue = {
        left: percentSize > 100 ? '100%' : `${percentSize}%`,
    };

    return (
        <div className={classNames(styles.Container, className)}>
            <div className={styles.Wrapper}>
                <div className={styles.Value} style={styleValue}>
                    {filledSize}
                </div>

                <div className={styles.Indicator}>
                    <div className={styles.IndicatorGreen}>
                        <div className={styles.IndicatorLabel}>{freeSize}</div>
                    </div>

                    <div className={styles.IndicatorYellow}>
                        <div className={styles.IndicatorLabel}>{doubleFreeSize}</div>
                    </div>

                    <div className={styles.IndicatorRed} />
                </div>
            </div>

            <div className={styles.Icon}>
                <Icon value="speed" />
            </div>
        </div>
    );
};
