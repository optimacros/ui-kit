import { useState } from 'react';

import { Tabs } from '../';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Tab, TabsProps } from '../models';

export const Draggable = ({ tabs: tabsProp, value: valueProp, ...rest }: TabsProps) => {
    const [value, setValue] = useState(valueProp);
    const [tabs, setTabs] = useState<Tab[]>(tabsProp);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleTabsChange = (newTabs: Tab[]) => {
        setTabs(newTabs);
    };

    return (
        <Tabs.Root
            {...rest}
            tabs={tabs}
            value={value}
            onValueChange={handleValueChange}
            onTabsChange={handleTabsChange}
        >
            <Tabs.List>
                {(tabs) =>
                    tabs.map((tab) => (
                        <Tabs.DraggableTrigger
                            key={tab.id}
                            id={tab.id}
                            fixed={tab.fixed}
                            disabled={tab.disabled}
                            data-testid={tab.id}
                        >
                            <Button variant="transparent">
                                <Icon value="article" />
                                {tab.title}
                            </Button>
                        </Tabs.DraggableTrigger>
                    ))
                }
            </Tabs.List>

            <Tabs.ContentContainer>
                {(tab) => (
                    <Tabs.Content id={tab.id}>
                        <p>tab {tab.id} content</p>
                    </Tabs.Content>
                )}
            </Tabs.ContentContainer>
        </Tabs.Root>
    );
};
