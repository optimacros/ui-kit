import { observer } from 'mobx-react';

import { driveLandingState } from '../../../../state/DriveLandingState';
import { Icon } from '../../../../components';

import styles from './MemoryIndicator.module.css';

export const MemoryIndicator = observer(() => {
    const { filledSize, percentSize, freeSize, doubleFreeSize } = driveLandingState;

    const styleValue = {
        left: percentSize > 100 ? '100%' : `${percentSize}%`,
    };

    return (
        <div className={styles.MemoryIndicatorContainer}>
            <div className={styles.Container}>
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
        </div>
    );
});
