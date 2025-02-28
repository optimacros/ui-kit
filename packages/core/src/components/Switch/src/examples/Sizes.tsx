import { ComponentProps } from 'react';
import { Switch } from '..';
import { Flex } from '@optimacros-ui/flex';

export const Sizes = (props: ComponentProps<typeof Switch.Root>) => (
    <Flex direction="column" gap={4}>
        <Switch.Root {...props} size="sm">
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Small switch</Switch.Label>
        </Switch.Root>

        <Switch.Root {...props} size="md">
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Medium switch</Switch.Label>
        </Switch.Root>

        <Switch.Root {...props} size="lg">
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Large switch</Switch.Label>
        </Switch.Root>
    </Flex>
);
