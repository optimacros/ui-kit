import * as Stories from './stories';
import { Snackbar } from '.';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Snackbar as OriginalSnackbar } from '@optimacros-ui/kit-legacy/src/main/components/Snackbar';

const argTypes: ArgTypes = {
    action: {
        control: 'text',
        description: 'Label for the `Button` component inside the Snackbar',
    },
    active: {
        control: 'boolean',
        description: 'If true, the snackbar will be active',
        table: { defaultValue: { summary: 'false' } },
    },
    children: {
        control: 'object',
        description: 'Text or node to be displayed in the content as alternative to `label`',
        table: { type: { summary: 'ReactNode' } },
    },
    className: {
        control: 'text',
        description: 'Additional class name to provide custom styling.',
    },
    label: {
        control: 'object',
        description: 'Text to display in the content',
        table: { type: { summary: 'ReactNode' } },
    },
    onClick: {
        control: false,
        description: 'Callback function that will be called when the `Button` is clicked',
        table: { type: { summary: '() => void' } },
    },
    onTimeout: {
        control: false,
        description: 'Callback function when finish the set timeout',
        table: { type: { summary: '() => void' } },
    },
    timeout: {
        control: 'number',
        description:
            'Amount of time in milliseconds after the Snackbar will be automatically hidden',
    },
    type: {
        options: ['accept', 'warning', 'cancel', 'default'],
        control: { type: 'radio' },
        description: 'Indicates the action type',
        table: { defaultValue: { summary: 'default' } },
    },
    Button: {
        control: false,
        description:
            'A button component to display at the bottom. Required for `onClick` and `action`',
        table: { defaultValue: { summary: 'Button' } },
    },
    theme: {
        control: 'object',
        description: 'A set of classes to apply styles to various parts of the component',
        table: {
            type: {
                summary: `{
accept: 'Added to the root element in case it's accept type',
cancel: 'Added to the root element in case it's cancel type',
warning: 'Added to the root element in case it's warning type'

active: 'Added to the root element when its active',
button: 'Used for the button inside the component',
label: 'Used for the label element',
portal: 'Used for the portal container element',
snackbar: 'Used as the className for the root element of the component',
 }`,
            },
        },
    },
};

const meta: Meta<typeof Snackbar> = {
    title: 'UI kit internal/Snackbar',
    parameters: {
        docs: {
            description: {
                component:
                    'Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen. Snackbars can contain an action.',
            },
        },
    },
    component: Snackbar,
    argTypes,
};

export default meta;

export type Story = StoryObj<typeof Snackbar>;

export const Basic: Story = {
    args: { active: true, action: 'action', label: 'label', children: <div>children</div> },
    render: Stories.Basic,
};

export const Original: StoryObj<typeof OriginalSnackbar> = {
    args: {
        children: 'children',
        active: true,
        timeout: 5000,
        action: 'action',
        label: 'label',
        type: 'accept',
    },
    render: Stories.Original,
};

export const Theme: Story = {
    args: {
        active: true,
        action: 'action',
        label: 'label',
        children: <div>children</div>,
        type: 'accept',
        className: 'className',
        theme: {
            accept: 'accept',
            cancel: 'cancel',
            warning: 'warning',
            active: 'active',
            button: 'button',
            label: 'label',
            portal: 'portal',
            snackbar: 'snackbar',
        },
    },
    render: Stories.Basic,
};
