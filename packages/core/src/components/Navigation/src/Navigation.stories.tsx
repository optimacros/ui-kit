import { Orientation } from '@optimacros-ui/utils';
import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { Navigation } from '.';
import { Children } from './examples/Children';
import * as examples from './examples';
import { ComponentProps } from 'react';

const argTypes: ArgTypes<ComponentProps<typeof Navigation.Root>> = {
    orientation: {
        control: 'radio',
        options: ['horizontal', 'vertical'],
        table: {
            defaultValue: { summary: 'horizontal' },
        },
        description: 'Type of the navigation.',
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
};

const meta: Meta<typeof Navigation.Root> = {
    title: 'UI Kit core/Navigation',
    component: Navigation.Root,
    parameters: {
        layout: 'centered',
    },
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Navigation.Root>;

export const Basic: Story = {
    args: { children: Children },
};

export const Vertical: Story = {
    args: { children: Children, orientation: Orientation.Vertical },
};

export const WsFeHeader: Story = { render: examples.WsFeHeader };
