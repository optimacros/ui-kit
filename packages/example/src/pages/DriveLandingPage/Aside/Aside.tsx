import { driveLandingState } from '../../../state/DriveLandingState';

import { Divider } from './Divider';
import { ModelArea } from './ModelArea';
import { MemoryIndicator } from './MemoryIndicator';
import { UserMenu } from './UserMenu/UserMenu';

import styles from './Aside.module.css';

export const Aside = () => {
    return (
        <div className={styles.Container}>
            <UserMenu />

            <MemoryIndicator />

            <div className={styles.Content}>
                <Divider />

                <ModelArea elements={driveLandingState.workspaceListSortByName} />
            </div>
        </div>
    );
};
