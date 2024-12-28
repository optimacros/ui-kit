import { SegmentedControl } from './index';

export default {
    title: 'UI Kit core/SegmentedControl',
    component: SegmentedControl.Root,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'If `true`, component will be disabled',
        },
        onValueChange: {
            table: { disable: true },
        },
        value: {
            control: 'text',
            description: 'Checked value',
        },
    },
};

export const Base = (props) => {
    return (
        <SegmentedControl.Root {...props} value="gradient">
            <SegmentedControl.Item value="gradient">item-1</SegmentedControl.Item>
            <SegmentedControl.Item value="partialGradient">item-2</SegmentedControl.Item>
        </SegmentedControl.Root>
    );
};
