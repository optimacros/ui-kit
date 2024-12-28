import { observer } from 'mobx-react';

import { driveLandingState, TabTypes } from '../../../../../state/DriveLandingState';
import { TabButton } from './TabButton';

import styles from './Tabs.module.css';

export const Tabs = observer(() => {
    return (
        <div className={styles.TabHeaderContainer}>
            <div className={styles.TabHeaderContainerScroller}>
                <TabButton
                    label="OLAP"
                    active={driveLandingState.activeTab == TabTypes.OLAP}
                    onClick={() => driveLandingState.changeActiveTab(TabTypes.OLAP)}
                />

                <TabButton
                    label="OLTP"
                    active={driveLandingState.activeTab == TabTypes.OLTP}
                    onClick={() => driveLandingState.changeActiveTab(TabTypes.OLTP)}
                />
            </div>
        </div>
    );
});
