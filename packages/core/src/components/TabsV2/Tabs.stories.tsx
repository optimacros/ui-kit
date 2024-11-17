import { useRef } from 'react';
import { Tabs } from '.';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { createTabs } from './mock';
import { Menu } from '../MenuV2';

export default {
    title: 'UI Kit core/TabsV2',
    component: Tabs.Root,
    tags: ['autodocs'],
};

const items = createTabs(20);

export const Base = (props) => {
    const ref = useRef(null);

    return (
        <Tabs.Root activationMode="manual">
            <Tabs.Api>
                {(api) => (
                    <div>
                        <Button
                            onClick={() => api.scrollTo(`tab-${Math.floor(Math.random() * 19)}`)}
                        >
                            select random tab
                        </Button>
                        <Button onClick={() => api.scrollToActive()}>scroll to active</Button>
                    </div>
                )}
            </Tabs.Api>
            <Tabs.List ref={ref}>
                {items.map((item) => (
                    <Tabs.Trigger value={item.value}>
                        <Button renderIcon={() => <Icon value="article" />} variant="transparent">
                            {item.value}
                        </Button>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
            {items.map((item) => (
                <Tabs.Content value={item.value}>{item.content}</Tabs.Content>
            ))}
            <Menu.Root>
                <Menu.Trigger>open</Menu.Trigger>
                <Menu.Content>
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
                </Menu.Content>
            </Menu.Root>
        </Tabs.Root>
    );
};
