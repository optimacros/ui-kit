import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Toolbar } from '../';
import { ComponentProps } from 'react';

export const Sizes = (props: ComponentProps<typeof Toolbar.Root>) => (
    <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2} style={{ width: '100%' }}>
            <Text.Title as="h5">Original</Text.Title>
            <div style={{ width: '100%' }}>
                <Toolbar.Root {...props} isSmall={false}>
                    <Button variant="accent"> Cancel </Button>
                    <Button variant="primary"> Submit </Button>
                </Toolbar.Root>
            </div>
        </Flex>

        <Flex direction="column" gap={2} style={{ width: '100%' }}>
            <Text.Title as="h5">Small</Text.Title>
            <div style={{ width: '100%' }}>
                <Toolbar.Root {...props} isSmall={true}>
                    <Button variant="accent"> Cancel </Button>
                    <Button variant="primary"> Submit </Button>
                </Toolbar.Root>
            </div>
        </Flex>
    </Flex>
);
