import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Toolbar } from '../';
import { ComponentProps } from 'react';
import { Align } from '@optimacros-ui/utils';

export const Alignment = (props: ComponentProps<typeof Toolbar.Root>) => (
    <Flex direction="column" gap={4}>
        {Object.values(Align).map((a) => (
            <Flex direction="column" gap={2} key={a} style={{ width: '100%' }}>
                <Text.Title as="h5">{a}</Text.Title>
                <div style={{ width: '100%' }}>
                    <Toolbar.Root {...props} align={a}>
                        <Button variant="accent"> Cancel </Button>
                        <Button variant="primary"> Submit </Button>
                    </Toolbar.Root>
                </div>
            </Flex>
        ))}
    </Flex>
);
