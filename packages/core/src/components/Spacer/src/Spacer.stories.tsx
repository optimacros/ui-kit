import { ArgTypes, StoryObj, Meta } from '@storybook/react';
import { Spacer } from '.';
import { ComponentProps } from 'react';
import * as examples from './examples';
import { Orientation } from '@optimacros-ui/utils';

const argTypes: ArgTypes<ComponentProps<typeof Spacer>> = {
    orientation: {
        description: 'Component orientation',
        control: 'radio',
        options: ['vertical', 'horizontal'],
        table: {
            type: { summary: 'Orientation' },
            defaultValue: { summary: 'vertical' },
        },
    },
    size: {
        description: 'Component size (spacing)',
        control: 'number',
        table: {
            defaultValue: { summary: '1' },
        },
    },
};

const meta: Meta<typeof Spacer> = {
    title: 'UI Kit core/Spacer',
    component: Spacer,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const Basic: Story = {
    args: { orientation: Orientation.Vertical, size: 1 },
    render: examples.Basic,
};

export const Horizontal: Story = {
    args: { orientation: Orientation.Horizontal, size: 1 },
    render: examples.Horizontal,
};
