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
                        gap={5}
                        direction="column"
                        style={{
                            width: '240px',
                            background: 'rgb(240 240 240)',
                            padding: 20,
                            borderRadius: 5,
                        }}
                    >
                        <Flex align="center" justify="space-between" fluid>
                            <Popover.Title>Title</Popover.Title>

                            <Popover.CloseTrigger asChild data-testid="close-trigger">
                                <IconButton icon="close" variant="transparent" />
                            </Popover.CloseTrigger>
                        </Flex>
                        <Popover.Description>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde non, ut
                            aliquam quasi, alias expedita quibusdam rerum deserunt vero veniam
                            sapiente voluptatibus nesciunt. Nam officiis quasi veniam repellat
                            consequatur. Saepe.
                        </Popover.Description>
                        <Flex align="center" gap={2} fluid>
                            <Popover.CloseTrigger asChild>
                                <Button variant="accent">Reset</Button>
                            </Popover.CloseTrigger>
                            <Popover.CloseTrigger asChild>
                                <Button variant="primary">Save</Button>
                            </Popover.CloseTrigger>
                        </Flex>
                    </Flex>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    );
};
