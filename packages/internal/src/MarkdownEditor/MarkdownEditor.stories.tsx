import { MarkdownEditor } from '.';
import * as stories from './stories';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { MarkdownEditor as OriginalMarkdownEditor } from '@optimacros-ui/kit-legacy/src/main/components/MarkdownEditor';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'text',
        description: 'Value',
        type: { name: 'string', required: true },
    },
    onChange: {
        control: false,
        description: 'Value',
        type: { name: 'function', required: true },
        table: { type: { summary: '(value: string) => void' } },
    },
    height: { control: 'number', description: 'Component height' },
    className: {
        control: 'text',
        description: 'Root element className',
    },
    editTabLabel: {
        control: 'text',
        description: 'Edit tab label',
        table: { defaultValue: { summary: 'Editor' } },
    },
    previewTabLabel: {
        control: 'text',
        description: 'Preview tab label',
        table: { defaultValue: { summary: 'Preview' } },
    },
    splitTabLabel: {
        control: 'text',
        description: 'Split tab label',
        table: { defaultValue: { summary: 'Split' } },
    },
};

// resizable?: boolean | string;

const meta: Meta = {
    title: 'UI kit internal/MarkdownEditor',
    component: MarkdownEditor,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof MarkdownEditor>;

export const Basic: Story = {
    args: {
        editTabLabel: 'editTabLabel',
        previewTabLabel: 'previewTabLabel',
        splitTabLabel: 'splitTabLabel',
        value: 'value',
        className: 'className',
        height: 300,
    },
    render: stories.Basic,
};

export const Original: StoryObj<typeof OriginalMarkdownEditor> = {
    args: {
        editTabLabel: 'editTabLabel',
        previewTabLabel: 'previewTabLabel',
        splitTabLabel: 'splitTabLabel',
        value: 'value',
        className: 'className',
        resizable: true,
        height: 300,
    },
    render: stories.Original,
};
