import { ComponentProps } from 'react';
import { Switch } from '..';
import { Flex } from '@optimacros-ui/flex';

export const LabelPlacement = (props: ComponentProps<typeof Switch.Root>) => (
    <Flex direction="column" gap={4}>
        <Switch.Root {...props}>
            <Switch.Label>Label before</Switch.Label>
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
        </Switch.Root>

        <Switch.Root {...props}>
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Label after</Switch.Label>
        </Switch.Root>
    </Flex>
);
