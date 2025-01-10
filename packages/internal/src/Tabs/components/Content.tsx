import { memo } from 'react';
import { TabExtended } from '../models';
import { Tabs } from '@optimacros-ui/tabs';

interface Props {
    tabs: TabExtended[];
    className?: string;
}

export const Content = memo<Props>(({ tabs, className }) => (
    <>
        {tabs.map((tab) => (
            <Tabs.Content value={tab.value} key={tab.value} className={className}>
                {tab.children}
            </Tabs.Content>
        ))}
    </>
));
Content.displayName = 'Content';
