import { useState } from 'react';
import { TabHeader, Tab, ITabs } from '../';

export const TH = (props: Partial<ITabs>) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabSwitch = (index: number) => {
        setActiveTab(index);
    };

    return (
        <TabHeader {...props} active={activeTab} onTabSwitch={handleTabSwitch}>
            <Tab title="editTabLabel" />
            <Tab title="previewTabLabel" />
            <Tab title="splitTabLabel" />
        </TabHeader>
    );
};
