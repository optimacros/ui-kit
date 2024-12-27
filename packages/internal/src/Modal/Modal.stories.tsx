import { Modal } from '.';
import * as stories from './stories';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Modal as OriginalModal } from '@optimacros-ui/kit-legacy/src/main/components/Modal';

const argTypes: Partial<ArgTypes> = {
    isOpen: {
        control: 'boolean',
        description: 'Whether modal is open',
        type: { name: 'boolean', required: true },
    },
    title: {
        control: 'text',
        description: 'Title of the modal',
        table: { type: { summary: 'ReactNode' } },
    },
    compact: {
        control: 'boolean',
        description: 'Whether compact mode is enabled',
        table: { defaultValue: { summary: 'false' } },
    },
    nonDraggable: {
        control: 'boolean',
        description: 'Whether dragging is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    draggableTarget: {
        control: 'text',
        description: 'Part of the modal which will be used as drag handle',
        table: {
            type: { summary: 'selector' },
            defaultValue: { summary: `[data-scope='dialog'][data-part='header']` },
        },
    },
    headerClassName: { control: 'text', description: 'Header class name' },
    contentClassName: { control: 'text', description: 'Content class name' },
    customHeaderButton: {
        control: 'text',
        description: 'Custom header content',
        table: { type: { summary: 'ReactNode' } },
    },
    isFatalError: { control: 'boolean', description: 'Whether close button is hidden' },
};

const meta: Meta = {
    title: 'UI kit internal/Modal',
    component: Modal,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
    args: {},
    render: stories.Basic,
};

export const Original: StoryObj<typeof OriginalModal> = {
    args: { isOpen: true },
    render: stories.Original,
};
