import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { FontIcon } from './index';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'text',
        description: 'The key string for the icon you want be displayed or custom icon element.',
    },
    title: {
        control: 'text',
        description: 'Icon description, visible on icon hover.',
    },
    alt: {
        control: 'text',
        description: 'The text used to set the `aria-label` attribute.',
    },
    style: {
        control: 'object',
        description: 'Add styles to component.',
    },
    className: {
        table: { disable: true },
    },
    onClick: {
        table: { disable: true },
    },
};

const meta: Meta<typeof FontIcon> = {
    title: 'legacy/FontIcon',
    component: FontIcon,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof FontIcon>;

export const Basic: Story = {
    args: {
        value: 'close',
        alt: 'close icon',
    },
};

export const WithTooltip: Story = {
    args: {
        value: 'search',
        title: 'description',
    },
};

export const CustomStyles: Story = {
    args: {
        value: 'home',
        style: { border: '1px solid black' },
    },
};
