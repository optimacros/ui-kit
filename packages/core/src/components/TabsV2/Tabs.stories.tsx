import { useRef } from 'react';
import { Tabs } from '.';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { createTabs } from './mock';
import { Menu } from '../MenuV2';
import { IconButton } from '../IconButtonV2';

export default {
    title: 'UI Kit core/TabsV2',
    component: Tabs.Root,
    tags: ['autodocs'],
};

const items = createTabs(20);

export const Base = (props) => {
    const ref = useRef(null);

    return (
        <Tabs.Root activationMode="manual" deselectable>
            <Tabs.Api>
                {(api) => (
                    <div>
                        <p>active tab: {api.value}</p>
                        <div>
                            <Button
                                onClick={() => api.open(`tab-${Math.floor(Math.random() * 19)}`)}
                            >
                                open random tab
                            </Button>
                            <Button onClick={() => api.scrollToActive()}>scroll to active</Button>
                            <Button onClick={() => api.first()}>select first</Button>
                            <Button onClick={() => api.last()}>select last</Button>
                        </div>
                    </div>
                )}
            </Tabs.Api>
            <div className="flex gap-2">
                <Tabs.List ref={ref}>
                    {items.map((item) => (
                        <Tabs.Trigger value={item.value}>
                            <Button
                                renderIcon={() => <Icon value="article" />}
                                variant="transparent"
                            >
                                {item.value}
                            </Button>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                <Tabs.Menu.Root>
                    <Tabs.Menu.Trigger asChild>
                        <IconButton renderIcon={() => <Icon value="settings" />} />
                    </Tabs.Menu.Trigger>
                    <Tabs.Menu.Content size="sm">
                        <Tabs.HiddenTabsList ref={ref}>
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
                    </Tabs.Menu.Content>
                </Tabs.Menu.Root>
            </div>
            {items.map((item) => (
                <Tabs.Content value={item.value}>{item.content}</Tabs.Content>
            ))}
        </Tabs.Root>
    );
};
