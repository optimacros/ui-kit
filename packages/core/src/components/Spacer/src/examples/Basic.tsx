import { ComponentProps } from 'react';
import { Spacer } from '..';
import { Flex } from '@optimacros-ui/flex';

export const Basic = (props: ComponentProps<typeof Spacer>) => {
    return (
        <Flex direction="column" align="stretch">
            <Flex style={{ flexBasis: 10, background: 'red' }} />
            <Spacer {...props} />
            <Flex style={{ flexBasis: 10, background: 'green' }} />
        </Flex>
    );
};
