import { ToastGroup } from '.';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as examples from './examples';
import * as toast from '@zag-js/toast';

const argTypes: Partial<ArgTypes<toast.GroupApi>> = {
    create: {
        control: false,
        description: 'Function to create a toast. Returns toast id.',
        table: { type: { summary: '(options: Options<O>) => string' } },
    },
    update: {
        control: false,
        description: `Function to update a toast's options by id.`,
        table: { type: { summary: '(id: string, options: Options<O>) => void' } },
    },
    remove: {
        control: false,
        description: `Function to remove a toast by id. If no id is provided, all toasts will be removed.`,
        table: { type: { summary: '(id?: string) => void' } },
    },
};

const meta: Meta<toast.GroupApi> = {
    title: 'UI Kit core/Toast/ToastApi',
    argTypes,
    tags: ['skip-test-runner'],
};

export default meta;

type Story = StoryObj<typeof ToastGroup.RootProvider>;

export const Basic: Story = {
    render: examples.Basic,
};
