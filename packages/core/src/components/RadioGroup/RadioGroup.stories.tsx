// @ts-nocheck
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const argTypes: Partial<ArgTypes> = {
    options: {
        table: { disable: true },
    },
    children: {
        table: { disable: true },
    },
    classNameButton: {
        table: { disable: true },
    },
    theme: {
        table: { disable: true },
    },
};

const meta: Meta<typeof RadioGroup> = {
    title: 'UI Kit core/RadioGroup',
    component: RadioGroup,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
    {
        label: 'gradient',
        value: 'gradient',
        disabled: true,
    },
    {
        label: 'without gradient',
        value: 'partialGradient',
    },
    {
        label: 'specified values only',
        value: 'notGradient',
    },
];

export const Basic: Story = {
    args: {
        options,
        value: 'notGradient',
    },
};
