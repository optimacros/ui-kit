import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Icon } from '@optimacros-ui/icon';
import { Orientation } from '@optimacros-ui/utils';
import { Divider } from './Divider';

export default {
    title: 'UI Kit core/Divider',
    component: Divider,
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: { type: 'radio' },
            options: Orientation,
        },
    },
};

export const Base = (props) => {
    return <Divider {...props} />;
};

export const Vertical = (props) => {
    return (
        <Flex gap="3" align="center">
            <Icon value="format_align_left" />
            <Icon value="format_align_center" />
            <Icon value="format_align_right" />
            <Divider orientation={Orientation.Vertical} {...props} />
            <Icon value="format_bold" />
        </Flex>
    );
};

export const Horizontal = (props) => {
    return (
        <div style={{ width: '200px' }}>
            <Flex align="center" direction="column">
                <Text.Paragraph>Full width variant below</Text.Paragraph>
                <Divider orientation={Orientation.Horizontal} fluid {...props} />
                <Text.Paragraph>Inset variant below</Text.Paragraph>
                <Divider orientation={Orientation.Horizontal} fluid {...props} />
                <Text.Paragraph>Middle variant below</Text.Paragraph>
            </Flex>
        </div>
    );
};
