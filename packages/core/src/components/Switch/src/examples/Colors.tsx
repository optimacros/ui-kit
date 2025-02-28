import { ComponentProps } from 'react';
import { Switch } from '..';
import { Flex } from '@optimacros-ui/flex';

export const Colors = (props: ComponentProps<typeof Switch.Root>) => (
    <Flex direction="column" gap={4}>
        <Flex gap={4}>
            <Switch.Root {...props} color="primary">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Primary</Switch.Label>
            </Switch.Root>
            <Switch.Root {...props} checked color="primary">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Primary</Switch.Label>
            </Switch.Root>
        </Flex>

        <Flex gap={4}>
            <Switch.Root {...props} color="success">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Success</Switch.Label>
            </Switch.Root>
            <Switch.Root {...props} checked color="success">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Success</Switch.Label>
            </Switch.Root>
        </Flex>

        <Flex gap={4}>
            <Switch.Root {...props} color="danger">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Danger</Switch.Label>
            </Switch.Root>
            <Switch.Root {...props} checked color="danger">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Danger</Switch.Label>
            </Switch.Root>
        </Flex>
    </Flex>
);
