import { useState } from 'react';

import { Tabs } from '../';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Tab, TabsProps } from '../models';
import { Controls } from './components';
import { Flex } from '../../../Flex/src/Flex';

export const BaseAllContentRendered = ({
    tabs: tabsProp,
    value: valueProp,
    ...rest
}: TabsProps) => {
    const [value, setValue] = useState(valueProp);
    const [tabs, setTabs] = useState<Tab[]>(tabsProp);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Flex gap="2" direction="column">
            <span>В этом примере рендерится (с аттрибутом hidden) весь контент всех табов</span>

            <Tabs.Root {...rest} tabs={tabs} value={value} onValueChange={handleValueChange}>
                <Flex gap="2" direction="column">
                    <Controls setTabs={setTabs} setValue={setValue} />

                    <Tabs.List>
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

                    {tabs.map((tab) => (
                        <Tabs.Content id={tab.id} key={tab.id}>
                            <p>tab {tab.id} content</p>
                        </Tabs.Content>
                    ))}
                </Flex>
            </Tabs.Root>
        </Flex>
    );
};
