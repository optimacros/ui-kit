import { Icon } from '@optimacros-ui/icon';
import { Text } from '@optimacros-ui/text';
import { Flex } from '@optimacros-ui/flex';
import { Chip } from './index';

export default {
    title: 'UI Kit core/Chip',
    component: Chip.Root,
    tags: ['autodocs'],
};

export const Base = (props) => {
    return <Chip.Root {...props}>Base</Chip.Root>;
};

export const Delete = (props) => {
    return (
        <Chip.Root {...props}>
            <Text.Paragraph>Deletable</Text.Paragraph>
            <Chip.Icon>
                <Icon value="cancel" />
            </Chip.Icon>
        </Chip.Root>
    );
};

export const Multiple = (props) => {
    return (
        <Flex gap="3" wrap="wrap">
            {new Array(10).fill(0).map(() => (
                <Chip.Root {...props}>
                    <Text.Paragraph>Deletable</Text.Paragraph>
                    <Chip.Icon>
                        <Icon value="cancel" />
                    </Chip.Icon>
                </Chip.Root>
            ))}
        </Flex>
    );
};
