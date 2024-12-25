import { Meta } from '@storybook/react';
import { IconButton } from '@optimacros-ui/icon-button';
import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Toolbar } from '@optimacros-ui/toolbar';
import { Popover } from '.';

export default {
    title: 'UI Kit core/Popover',
    component: Popover.Root,
    tags: ['autodocs'],
} as Meta;

export const Base = () => {
    return (
        <Popover.Root>
            <Flex align="center">
                <Text.Title>Support cases</Text.Title>
                <Popover.Trigger asChild>
                    <IconButton>info</IconButton>
                </Popover.Trigger>
            </Flex>
            <Popover.Positioner>
                <Popover.Content>
                    <Flex
                        gap={2}
                        direction="column"
                        style={{
                            maxWidth: '200px',
                            background: 'rgb(240 240 240)',
                            padding: 20,
                            borderRadius: 5,
                        }}
                    >
                        <Popover.Title> Info </Popover.Title>
                        <Popover.Description>
                            This represents your entire organization`s supports cases. To view
                            support cases that you have opened, visit the support center.
                        </Popover.Description>

                        <Toolbar.Root>
                            <Flex gap={1}>
                                <Button variant="accent" size="sm">
                                    Learn more
                                </Button>
                                <Popover.CloseTrigger asChild>
                                    <Button size="sm">Close</Button>
                                </Popover.CloseTrigger>
                            </Flex>
                        </Toolbar.Root>
                    </Flex>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    );
};

export const CloseIcon = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <IconButton>open_in_new</IconButton>
            </Popover.Trigger>

            <Popover.Positioner>
                <Popover.Content>
                    <Popover.CloseTrigger asChild>
                        <IconButton>close</IconButton>
                    </Popover.CloseTrigger>
                    <Popover.Description>Click this icon to switch to map view</Popover.Description>
                    <Button variant="accent">Got it</Button>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    );
};
