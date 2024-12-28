import React from 'react';

import { driveLandingState } from '../../../../state/DriveLandingState';
import { FontIcon } from '../../../../components';

import styles from './UserMenu.module.css';

export class UserMenu extends React.Component {
    render() {
        return (
            <div className={styles.Header}>
                <div className={styles.IconWrapper}>
                    <span className={styles.UserIcon} />
                </div>

                <div>
                    <div className={styles.UserButton}>
                        <span>{driveLandingState.userName}</span>

                        <FontIcon className={styles.UserArrow} value="arrow_drop_down" />
                    </div>
                </div>
            </div>
        );
    }
}
