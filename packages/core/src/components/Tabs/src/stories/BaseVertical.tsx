import { useState } from 'react';

import { Tabs } from '../';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Tab, TabsProps } from '../models';
import { Flex } from '@optimacros-ui/flex';

export const BaseVertical = ({ tabs: tabsProp, value: valueProp, ...rest }: TabsProps) => {
    const [tabs] = useState<Tab[]>(tabsProp);
    const [value, setValue] = useState(valueProp);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Tabs.Root {...rest} tabs={tabs} value={value} onValueChange={handleValueChange}>
            <Flex gap="2" direction="column">
                <Tabs.List style={{ height: '10rem' }}>
                    {(tabs) =>
                        tabs.map((tab) => (
                            <Tabs.Trigger
                                key={tab.id}
                                id={tab.id}
                                fixed={tab.fixed}
                                disabled={tab.disabled}
                            >
                                <Button variant="transparent">
                                    <Icon value="article" />
                                    {tab.title}
                                </Button>
                            </Tabs.Trigger>
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
            </Flex>
        </Tabs.Root>
    );
};
