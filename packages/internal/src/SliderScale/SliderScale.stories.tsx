import { useState } from 'react';
import { SliderScale } from './index';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof SliderScale> = {
    title: 'UI KIT Internal/SliderScale',
    component: SliderScale,
    argTypes,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof SliderScale>;

export const Basic: Story = {
    args: {
        name: 'axisFontSize',
        label: 'Font Size',
        min: 8,
        max: 64,
        step: 2,
        disabled: false,
        pinned: true,
        snaps: true,
        editable: false,
    },
    render: (args) => {
        const [value, setValue] = useState<number>(12);
        return <SliderScale {...args} value={value} onChange={(value) => setValue(value)} />;
    },
};

export const Input: Story = {
    args: {
        name: 'axisFontSize',
        label: 'Font Size',
        min: 8,
        max: 64,
        step: 2,
        disabled: false,
        pinned: true,
        snaps: true,
        editable: true,
    },
    render: (args) => {
        const [value, setValue] = useState<number>(12);
        return <SliderScale {...args} value={value} onChange={(value) => setValue(value)} />;
    },
};
