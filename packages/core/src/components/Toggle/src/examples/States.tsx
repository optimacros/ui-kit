import { ComponentProps } from 'react';
import { Toggle } from '..';
import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';

export const States = (props: ComponentProps<typeof Toggle>) => (
    <Flex direction="column" gap={4}>
        <Flex gap={4}>
            <Toggle {...props} disabled>
                <Button>Disabled</Button>
            </Toggle>

            <Toggle {...props} disabled checked>
                <Button>Disabled checked</Button>
            </Toggle>
        </Flex>

        <Flex gap={4}>
            <Toggle {...props} readOnly>
                <Button>Read-only</Button>
            </Toggle>

            <Toggle {...props} readOnly checked>
                <Button>Read-only checked</Button>
            </Toggle>
        </Flex>

        <Flex gap={4}>
            <Toggle {...props} invalid>
                <Button>Invalid</Button>
            </Toggle>

            <Toggle {...props} invalid checked>
                <Button>Invalid checked</Button>
            </Toggle>
        </Flex>
    </Flex>
);
