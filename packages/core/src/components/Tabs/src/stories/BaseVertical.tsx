import { useState } from 'react';
import { flushSync } from 'react-dom';

import { Tabs } from '../';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Menu } from '@optimacros-ui/menu';
import { IconButton } from '@optimacros-ui/icon-button';
import { Tab, TabsProps } from '../models';
import { Controls } from './components';
import { Flex } from '@optimacros-ui/flex';

export const BaseVertical = (props: TabsProps) => {
    const [tabs, setTabs] = useState<Tab[]>(props.tabs);

    return (
        <Tabs.Root onTabsChange={(t) => flushSync(() => setTabs(t))} {...props}>
            <Controls setTabs={setTabs} />

            <Flex gap="2">
                <Tabs.List style={{ height: '10rem' }}>
                    {tabs.map((tab) => (
                        <Tabs.Trigger value={tab.value} key={tab.value} index={tab.index}>
                            <Button variant="transparent">
                                <Icon value="article" />
                                {tab.value}
                            </Button>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
            </Flex>
            <Tabs.Menu.Root>
                <Tabs.Menu.Trigger asChild>
                    <IconButton icon="settings" />
                </Tabs.Menu.Trigger>
                <Tabs.Menu.Content size="sm">
                    <Tabs.Menu.List>
                        <Tabs.HiddenTabsList>
                            {(props) => (
                                <Menu.Item
                                    {...props}
                                    key={props.value}
                                    valueText={props.value}
                                    closeOnSelect
                                >
                                    {props.value}
                                </Menu.Item>
                            )}
                        </Tabs.HiddenTabsList>
                    </Tabs.Menu.List>
                </Tabs.Menu.Content>
            </Tabs.Menu.Root>

            {tabs.map((item) => (
                <Tabs.Content value={item.value} key={item.value}>
                    {item.content}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};
