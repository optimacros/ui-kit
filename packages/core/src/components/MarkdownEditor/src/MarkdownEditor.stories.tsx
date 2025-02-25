import { MarkdownEditor } from './index';
import { ArgTypes, Meta } from '@storybook/react';
import { StoryObj } from '@storybook/react';
import { generateMarkdown } from './mock';
import * as scenarios from './__tests__/scenarios';
import * as examples from './examples';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';

const argTypes: Partial<ArgTypes<ComponentProps<typeof MarkdownEditor.Root>>> = {
    value: {
        control: 'text',
        description: 'Current editor value',
    },
    activeTab: {
        control: 'radio',
        description: 'Initial active tab',
        options: ['edit', 'preview', 'split'],
        table: { defaultValue: { summary: 'edit' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the editor is disabled',
    },
    onChange: {
        control: false,
        description: 'Value change handler',
        table: { type: { summary: '(newValue: string) => void' } },
    },
    as: {
        table: { disable: true },
    },
    asChild: {
        table: { disable: true },
    },
};

const meta: Meta<typeof MarkdownEditor.Root> = {
    title: 'Ui kit core/Markdown Editor',
    component: MarkdownEditor.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof MarkdownEditor.Root>;

export const Basic: Story = {
    args: {
        value: generateMarkdown(),
        disabled: false,
        onChange: fn(),
        activeTab: MarkdownEditor.MarkdownEditorMode.EDIT,
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const Disabled: Story = {
    args: {
        value: generateMarkdown(),
        disabled: true,
        onChange: fn(),
        activeTab: MarkdownEditor.MarkdownEditorMode.EDIT,
    },
    render: examples.Basic,
    play: scenarios.disabled,
};
