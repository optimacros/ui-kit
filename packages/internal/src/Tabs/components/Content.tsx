import { memo } from 'react';
import { TabExtended, TabsTheme } from '../models';
import { Tabs } from '@optimacros-ui/tabs';
import { Flex } from '@optimacros-ui/flex';

interface Props {
    tabs: TabExtended[];
    className?: string;
    theme: Partial<TabsTheme>;
}

export const Content = memo<Props>(({ tabs, className, theme }) => (
    <Flex className={className}>
        {tabs.map((tab) => (
            <Tabs.Content value={tab.value} key={tab.value} className={theme.TabContent_Inner}>
                {tab.children}
            </Tabs.Content>
        ))}
    </Flex>
));
Content.displayName = 'Content';
