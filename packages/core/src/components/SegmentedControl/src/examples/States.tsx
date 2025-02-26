import { SegmentedControl } from '../index';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Basic } from './Basic';

export const States = (props: SegmentedControl.RootProps) => {
    return (
        <Flex direction="column" gap={2}>
            <Flex direction="column" gap={2}>
                <Text.Title as="h5">Disabled</Text.Title>
                <Basic {...props} disabled />
            </Flex>
            <Flex direction="column" gap={2}>
                <Text.Title as="h5">ReadOnly</Text.Title>
                <Basic {...props} readOnly />
            </Flex>
        </Flex>
    );
};
