import { useState } from 'react';
import { TabHeader, Tab, TabsProps } from '../';

export const TH = (props: Partial<TabsProps>) => {
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
