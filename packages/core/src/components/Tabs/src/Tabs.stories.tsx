import { useRef, useState } from 'react';
import { Tabs } from '.';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { createTabs } from './mock';
import { Menu } from '@optimacros-ui/menu';
import { IconButton } from '@optimacros-ui/icon-button';
import { Flex } from '@optimacros-ui/flex';
import { shuffle } from '@optimacros-ui/utils';

export default {
    title: 'UI Kit core/Tabs',
    component: Tabs.Root,
    tags: ['autodocs'],
};

const items = createTabs(20);

export const Base = (props) => {
    const [tabs, setTabs] = useState(items);
    const ref = useRef(null);

    return (
        <Tabs.Root activationMode="manual" deselectable>
            <Tabs.Api>
                {(api) => (
                    <div>
                        <p>active tab: {api.value}</p>
                        <div>
                            <Button onClick={() => api.getTabs()}>get tabs</Button>
                            <Button
                                onClick={() => api.open(`tab-${Math.floor(Math.random() * 19)}`)}
                            >
                                open random tab
                            </Button>
                            <Button onClick={() => api.scrollToActive()}>scroll to active</Button>
                            <Button onClick={() => api.first()}>select first</Button>
                            <Button onClick={() => api.last()}>select last</Button>
                            <Button onClick={() => setTabs((prev) => shuffle(prev))}>
                                shuffle
                            </Button>
                        </div>
                    </div>
                )}
            </Tabs.Api>
            <div className="flex gap-2">
                <Tabs.List ref={ref}>
                    {tabs.map((tab, i) => (
                        <Tabs.Trigger {...props} value={tab.value} key={tab.value}>
                            <Button variant="transparent">
                                <Icon value="article" />
                                {tab.value}
                            </Button>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                <Tabs.Menu.Root>
                    <Tabs.Menu.Trigger asChild>
                        <IconButton icon="settings" />
                    </Tabs.Menu.Trigger>
                    <Tabs.Menu.Positioner portalled>
                        <Tabs.Menu.Content size="sm">
                            <Tabs.Menu.List>
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
                            </Tabs.Menu.List>
                        </Tabs.Menu.Content>
                    </Tabs.Menu.Positioner>
                </Tabs.Menu.Root>
            </div>
            {items.map((item) => (
                <Tabs.Content value={item.value} key={item.value}>
                    {item.content}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};

export const Secondary = (props) => {
    const [tabs, setTabs] = useState(items);
    const ref = useRef(null);

    return (
        <Tabs.Root activationMode="manual" deselectable variant="secondary">
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
                            <Button onClick={() => setTabs((prev) => shuffle(prev))}>
                                shuffle
                            </Button>
                        </div>
                    </div>
                )}
            </Tabs.Api>
            <div className="flex gap-2">
                <Tabs.List ref={ref}>
                    {tabs.map((tab, i) => (
                        <Tabs.Trigger {...props} value={tab.value} key={tab.value}>
                            <Button variant="transparent">
                                <Icon value="article" />
                                {tab.value}
                            </Button>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                <Tabs.Menu.Root>
                    <Tabs.Menu.Trigger asChild>
                        <IconButton icon="settings" />
                    </Tabs.Menu.Trigger>
                    <Tabs.Menu.Positioner portalled>
                        <Tabs.Menu.Content size="sm">
                            <Tabs.Menu.List>
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
                            </Tabs.Menu.List>
                        </Tabs.Menu.Content>
                    </Tabs.Menu.Positioner>
                </Tabs.Menu.Root>
            </div>
            {items.map((item) => (
                <Tabs.Content value={item.value} key={item.value}>
                    {item.content}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};

export const BaseVertical = (props) => {
    const [tabs, setTabs] = useState(items);
    const ref = useRef(null);

    return (
        <Tabs.Root activationMode="manual" deselectable orientation="vertical">
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
                            <Button onClick={() => setTabs((prev) => shuffle(prev))}>
                                shuffle
                            </Button>
                        </div>
                    </div>
                )}
            </Tabs.Api>
            <Flex gap="2">
                <Tabs.List ref={ref} style={{ height: '10rem' }}>
                    {tabs.map((tab, i) => (
                        <Tabs.Trigger {...props} value={tab.value} key={tab.value}>
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
                    </Tabs.Menu.List>
                </Tabs.Menu.Content>
            </Tabs.Menu.Root>
            {items.map((item) => (
                <Tabs.Content value={item.value} key={item.value}>
                    {item.content}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};

export const DraggableOrdered = (props) => {
    const [tabs, setTabs] = useState(items);

    return (
        <Tabs.Root activationMode="manual" deselectable>
            <div className="flex gap-2">
                <Tabs.DraggableList setTabs={setTabs}>
                    {tabs.map((tab, i) => (
                        <Tabs.DraggableTrigger
                            {...props}
                            value={tab.value}
                            key={tab.value}
                            data-index={i}
                        >
                            <Button variant="transparent">
                                <Icon value="article" />
                                {tab.value}
                            </Button>
                        </Tabs.DraggableTrigger>
                    ))}
                </Tabs.DraggableList>
            </div>
            {items.map((item) => (
                <Tabs.Content value={item.value} key={item.value}>
                    {item.content}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};

//TODO: fix scroll problem
export const DraggableSwap = (props) => {
    const [tabs, setTabs] = useState(items);

    return (
        <Tabs.Root activationMode="manual" deselectable>
            <div className="flex gap-2">
                <Tabs.DraggableList setTabs={setTabs} mode="swap">
                    {tabs.map((tab, i) => (
                        <Tabs.DraggableTrigger
                            {...props}
                            value={tab.value}
                            key={tab.value}
                            data-index={i}
                        >
                            <Button variant="transparent">
                                <Icon value="article" />
                                {tab.value}
                            </Button>
                        </Tabs.DraggableTrigger>
                    ))}
                </Tabs.DraggableList>
            </div>
            {items.map((item) => (
                <Tabs.Content value={item.value} key={item.value}>
                    {item.content}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};
