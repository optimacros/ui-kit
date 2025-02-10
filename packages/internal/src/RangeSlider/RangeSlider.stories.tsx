// @ts-nocheck
import { useState } from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { RangeSlider } from '.';

const meta: Meta<typeof RangeSlider> = {
    title: 'UI Kit internal/RangeSlider',
    component: RangeSlider,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
    argTypes: {
        step: {
            control: 'number',
            description: 'Step increment value',
            defaultValue: 1,
        },
        min: {
            control: 'number',
            description: 'Minimum value',
            defaultValue: 0,
        },
        max: {
            control: 'number',
            description: 'Maximum value',
            defaultValue: 100,
        },
        values: {
            control: 'object',
            description: 'Array of selected values',
        },
        customValues: {
            control: 'object',
            description: 'Array of custom values',
        },
        rangeValues: {
            control: 'object',
            description: 'Array of range values',
        },
        color: {
            control: 'color',
            description: 'Color for the range slider',
        },
        classNameTrack: {
            control: 'text',
            description: 'Additional CSS class for the track',
        },
        hasRangeValues: {
            control: 'boolean',
            description: 'Whether to show range values',
            defaultValue: false,
        },
        designTheme: {
            description: 'Theme function for custom design',
        },
        onChange: {
            action: 'changed',
            description: 'Handler called during value changes',
        },
        onFinalChange: {
            action: 'finalChanged',
            description: 'Handler called when changing is finished',
        },
    },
};

export default meta;

type Story = StoryObj<typeof RangeSlider>;

const useRangeState = () => {
    const [values, setValues] = useState([7, 35]);

    const handleChange = (values: number[]) => {
        setValues(values);
    };

    return [values, handleChange];
};

export const Basic: Story = {
    args: {
        min: 0,
        max: 100,
        step: 1,
        values: [30, 70],
        color: '#0066ff',
    },
    render: (args) => {
        const [values, handleChange] = useRangeState();

        return <RangeSlider {...args} values={values} onChange={handleChange} />;
    },
};

export const DefaultRangeValues: Story = {
    args: {
        min: 0,
        max: 100,
        step: 20,
        values: [20, 80],
        hasRangeValues: true,
        color: '#ff0000',
    },
    render: (args) => {
        const [values, handleChange] = useRangeState();

        return <RangeSlider {...args} values={values} onChange={handleChange} />;
    },
};
