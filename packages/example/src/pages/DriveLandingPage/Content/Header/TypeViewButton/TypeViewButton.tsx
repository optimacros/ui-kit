import { observer } from 'mobx-react';

import { driveLandingState } from '../../../../../state/DriveLandingState';
import { FontIcon } from '../../../../../components';

import styles from './TypeViewButton.module.css';

export const TypeViewButton = observer(() => {
    const icon = driveLandingState.isCardView ? 'view_headline' : 'apps';

    return (
        <div className={styles.View} onClick={() => driveLandingState.toggleCardView()}>
            <FontIcon className={styles.ViewIcon} value={icon} />
        </div>
    );
});
