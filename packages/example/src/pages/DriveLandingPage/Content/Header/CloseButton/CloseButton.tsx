import { driveLandingState } from '../../../../../state/DriveLandingState';
import { FontIcon } from '../../../../../components';

import styles from './CloseButton.module.css';

export function CloseButton() {
    const onClose = () => {
        driveLandingState.changePage('main');
    };

    return <FontIcon value="close" className={styles.CloseButton} onClick={onClose} />;
}
