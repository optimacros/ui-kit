import { useState } from 'react';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { SliderScale } from './index';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof SliderScale> = {
    title: 'legacy/SliderScale',
    component: SliderScale,
    argTypes,
    tags: ['skip-test-runner'],
};
export default meta;

type Story = StoryObj<typeof SliderScale>;

export const Basic: Story = {
    args: {
        name: 'axisFontSize',
        min: 0,
        max: 10,
        buffer: 0,
        step: 1,
        pinned: true,
        snaps: true,
    },
    render: (args) => {
        const [value, setValue] = useState<number>(1);
        return <SliderScale {...args} value={value} onChange={(value) => setValue(value)} />;
    },
};
