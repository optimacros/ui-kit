import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { SliderScale } from './index';

const argTypes: Partial<ArgTypes> = {
    buffer: {
        control: 'number',
    },
    disabled: {
        control: 'boolean',
    },
    editable: {
        control: 'boolean',
    },
    max: {
        control: 'number',
    },
    min: {
        control: 'number',
    },
    pinned: {
        control: 'boolean',
    },
    snaps: {
        control: 'boolean',
    },
    step: {
        control: 'number',
    },
    dataMax: {
        control: 'number',
    },
    value: {
        control: 'number',
    },
    name: {
        control: 'string',
    },
};

const meta: Meta<typeof SliderScale> = {
    title: 'UI Kit main/SliderScale',
    component: SliderScale,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof SliderScale>;

export const Basic: Story = {
    args: {
        buffer: 5,
        disabled: false,
        editable: false,
        max: 30,
        min: 0,
        pinned: false,
        snaps: false,
        step: 1,
        dataMax: 30,
        name: 'slider',
        value: 3,
    },
};
