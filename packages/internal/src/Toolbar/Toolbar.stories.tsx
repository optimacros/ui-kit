import { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from './index';
import { Button } from '@optimacros-ui/button';

const meta: Meta<typeof Toolbar> = {
    title: 'UI Kit internal/Toolbar',
    component: Toolbar,
    tags: ['autodocs'],
    argTypes: {
        align: {
            control: { type: 'radio' },
            options: ['left', 'right', 'center', 'rightInRow'],
            defaultValue: 'left',
            description: 'Alignment of toolbar items',
        },
    },
};

const content = [
    <Button key="1" variant="accent">
        button
    </Button>,
    <Button key="2" variant="primary">
        another button
    </Button>,
];

export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Basic: Story = {
    args: {
        align: 'left',
        children: content,
    },
};

export const LeftAligned: Story = {
    args: {
        align: 'left',
        children: content,
    },
};

export const RightAligned: Story = {
    args: {
        align: 'right',
        children: content,
    },
};

export const CenterAligned: Story = {
    args: {
        align: 'center',
        children: content,
    },
};

export const RightInRowAligned: Story = {
    args: {
        align: 'rightInRow',
        children: content,
    },
};
