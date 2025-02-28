import { ComponentProps } from 'react';
import { Spacer } from '..';
import { Flex } from '@optimacros-ui/flex';

export const Horizontal = (props: ComponentProps<typeof Spacer>) => {
    return (
        <Flex height={10} align="stretch">
            <Flex style={{ flexGrow: 1, background: 'red' }} />
            <Spacer {...props} />
            <Flex style={{ flexGrow: 1, background: 'green' }} />
        </Flex>
    );
};
