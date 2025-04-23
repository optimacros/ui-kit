import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { FontIcon } from './index';
import { ComponentProps } from 'react';
import * as scenarios from './__tests__/scenarios';

const argTypes: Partial<ArgTypes<ComponentProps<typeof FontIcon>>> = {
    value: {
        control: 'text',
        description:
            'The key string for the icon you want be displayed or custom icon element. List of all available icons can be found here https://github.com/google/material-design-icons',
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
    as: {
        table: { disable: true },
    },
    asChild: {
        table: { disable: true },
    },
};

const meta: Meta<typeof FontIcon> = {
    title: 'UI Kit core/FontIcon',
    component: FontIcon,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof FontIcon>;

export const Basic: Story = {
    args: {
        value: 'accessible_forward',
        alt: 'close icon',
        title: 'close',
        className: 'className',
    },
    play: scenarios.basic,
};

export const CustomStyles: Story = {
    args: {
        value: 'lock',
        alt: 'close icon',
        title: 'close',
        className: 'className',
        style: { border: '1px solid black' },
    },
    tags: ['skip-test-runner'],
};
