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
        <Flex gap={2} direction="column">
            <Popover.Root>
                <Flex align="center">
                    <Text.Paragraph>Support cases</Text.Paragraph>
                    <Popover.Trigger asChild>
                        <IconButton variant="transparent">info</IconButton>
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

            <Popover.Root>
                <Flex align="center">
                    <Text.Paragraph>Information about this feature</Text.Paragraph>
                    <Popover.Trigger asChild>
                        <IconButton icon="info" variant="transparent" />
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
                            <Popover.CloseTrigger asChild>
                                <IconButton icon="close" variant="transparent" />
                            </Popover.CloseTrigger>

                            <Popover.Description>
                                Important information about this feature
                            </Popover.Description>
                            <Popover.CloseTrigger asChild>
                                <Button variant="primary">Understood</Button>
                            </Popover.CloseTrigger>
                        </Flex>
                    </Popover.Content>
                </Popover.Positioner>
            </Popover.Root>

            <Popover.Root>
                <Flex align="center">
                    <Text.Paragraph>Preferences</Text.Paragraph>
                    <Popover.Trigger asChild>
                        <IconButton icon="settings" variant="transparent" />
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
                            <Popover.CloseTrigger asChild>
                                <IconButton icon="close" variant="transparent" />
                            </Popover.CloseTrigger>
                            <Popover.Description>Adjust your preferences</Popover.Description>
                            <div>
                                <Popover.CloseTrigger asChild>
                                    <Button variant="accent">Reset</Button>
                                </Popover.CloseTrigger>
                                <Popover.CloseTrigger asChild>
                                    <Button variant="primary">Save</Button>
                                </Popover.CloseTrigger>
                            </div>
                        </Flex>
                    </Popover.Content>
                </Popover.Positioner>
            </Popover.Root>

            <Popover.Root>
                <Flex align="center">
                    <Text.Paragraph>Test</Text.Paragraph>

                    <Popover.Trigger asChild>
                        <IconButton icon="help" variant="transparent" />
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
                            <Popover.CloseTrigger asChild>
                                <IconButton icon="close" variant="transparent" />
                            </Popover.CloseTrigger>
                            <Popover.Description>
                                Need assistance? Follow these steps:
                            </Popover.Description>
                            <ol>
                                <li>Step 1 description</li>
                                <li>Step 2 description</li>
                            </ol>
                            <Popover.CloseTrigger asChild>
                                <Button variant="accent">Got it</Button>
                            </Popover.CloseTrigger>
                        </Flex>
                    </Popover.Content>
                </Popover.Positioner>
            </Popover.Root>
        </Flex>
    );
};
