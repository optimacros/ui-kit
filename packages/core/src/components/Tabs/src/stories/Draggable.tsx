import { useState } from 'react';

import { Tabs } from '../';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Tab, TabsProps } from '../models';

export const Draggable = ({ tabs: tabsProp, ...rest }: TabsProps) => {
    const [tabs, setTabs] = useState<Tab[]>(tabsProp);

    return (
        <Tabs.Root {...rest} onTabsChange={(tabs) => setTabs(tabs)}>
            <div className="flex gap-2">
                <Tabs.List>
                    {tabs.map((tab) => (
                        <Tabs.DraggableTrigger
                            value={tab.value}
                            key={tab.value}
                            data-index={tab.index}
                            data-testid={tab.value}
                            index={tab.index}
                        >
                            <Button variant="transparent">
                                <Icon value="article" />
                                {tab.value}
                            </Button>
                        </Tabs.DraggableTrigger>
                    ))}
                </Tabs.List>
            </div>
            {tabs.map((item) => (
                <Tabs.Content value={item.value} key={item.value}>
                    {item.content}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};
