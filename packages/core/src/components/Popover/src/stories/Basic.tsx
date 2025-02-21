import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Popover } from '..';
import { IconButton } from '@optimacros-ui/icon-button';
import { Button } from '@optimacros-ui/button';
import { ComponentProps } from 'react';

export const Basic = (props: ComponentProps<typeof Popover.Root>) => {
    return (
        <Popover.Root {...props} data-testid="root">
            <Flex align="center">
                <Text.Paragraph>Preferences</Text.Paragraph>
                <Popover.Trigger asChild data-testid="open-trigger">
                    <IconButton icon="settings" variant="transparent" />
                </Popover.Trigger>
            </Flex>

            <Popover.Positioner>
                <Popover.Content data-testid="content">
                    <Popover.Arrow />

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
                        <Popover.Title>Title</Popover.Title>

                        <Popover.CloseTrigger asChild data-testid="close-trigger">
                            <IconButton icon="close" variant="transparent" />
                        </Popover.CloseTrigger>

                        <Popover.Description>Description</Popover.Description>
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
    );
};
