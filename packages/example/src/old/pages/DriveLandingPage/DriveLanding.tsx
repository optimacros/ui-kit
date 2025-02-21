import { Aside } from './Aside';
import { Content } from './Content';

import styles from './DriveLanding.module.css';

export function DriveLandingPage() {
    return (
        <div className={styles.Container}>
            <Content />

            <Aside />
        </div>
    );
}
