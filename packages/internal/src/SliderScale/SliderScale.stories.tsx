import { useState } from 'react';
import { SliderScale } from './index';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof SliderScale> = {
    title: 'UI KIT Internal/SliderScale',
    component: SliderScale,
    argTypes,
    tags: ['skip-test-runner'],
};
export default meta;

type Story = StoryObj<typeof SliderScale>;

export const Basic: Story = {
    args: {
        name: 'axisFontSize',
        min: 8,
        max: 64,
        step: 20,
        disabled: false,
        pinned: true,
        snaps: true,
    },
    render: (args) => {
        const [value, setValue] = useState<number>(10);
        return <SliderScale {...args} value={value} onChange={(value) => setValue(value)} />;
    },
};
