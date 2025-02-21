import { observer } from 'mobx-react';

import { driveLandingState } from '../../../state/DriveLandingState';

import styles from './Footer.module.css';

export const Footer = observer(() => {
    const { startDate, copyrightTitle, appVersion } = driveLandingState;

    const currentYear = new Date().getFullYear();
    const copyrightLabel = `©Copyright ${copyrightTitle} ${startDate} - ${currentYear}`;

    return (
        <div className={styles.Footer}>
            {appVersion && <div className={styles.applicationVersion}>{appVersion}</div>}

            <div className={styles.FooterCopyright}>{copyrightLabel}</div>
        </div>
    );
});
