import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
    component: Footer,
    title: 'UI Kit core/Footer',
    argTypes: {
        appVersion: {
            description: 'Specify App version',
            control: 'text',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Basic: Story = {
    args: {
        appVersion: '1.0.0',
        copyright: `©Copyright Optimacros 2018 - ${new Date().getFullYear()}`,
        children: 'children content',
    },
};
