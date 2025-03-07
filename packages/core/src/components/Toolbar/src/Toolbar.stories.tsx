import { ComponentProps } from 'react';
import { Toolbar } from './index';
import { Align } from '@optimacros-ui/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as examples from './examples';

const argTypes: Partial<ArgTypes<ComponentProps<typeof Toolbar.Root>>> = {
    align: {
        control: 'radio',
        options: Object.values(Align) as string[],
        table: {
            defaultValue: {
                summary: Align.Left,
            },
        },
    },
    isSmall: {
        control: 'boolean',
        description: 'If `true`, toolbar will have less margin top.',
        table: {
            defaultValue: {
                summary: 'false',
            },
        },
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
};

const meta: Meta<typeof Toolbar.Root> = {
    title: 'UI Kit core/Toolbar',
    component: Toolbar.Root,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Toolbar.Root>;

export const Base: Story = {
    args: {
        align: Align.Left,
        isSmall: false,
    },
    render: examples.Basic,
    tags: ['skip-test-runner'],
};

export const Alignment: Story = {
    args: { isSmall: false },
    render: examples.Alignment,
};

export const Size: Story = {
    render: examples.Sizes,
};

export const WithModal: Story = {
    args: { align: Align.Right, isSmall: true },
    render: examples.WithModal,
    tags: ['skip-test-runner'],
};

export const WithForm: Story = {
    args: { align: Align.Right, isSmall: true },
    render: examples.WithForm,
    tags: ['skip-test-runner'],
};
