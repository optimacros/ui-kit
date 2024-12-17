import { useState } from 'react';
import { MarkdownEditor } from './index';
import { ArgTypes, Meta } from '@storybook/react';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'text',
        description: 'Current editor value',
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
};

const meta: Meta = {
    title: 'UI Kit main/Markdown Editor V2',
    argTypes,
};
export default meta;

const defaultValue = `## heading

text

- list
- list
- list`;

export const Basic = () => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (v: string) => setValue(v);

    return (
        <div style={{ width: '100%', height: 500 }}>
            <button style={{ marginBottom: 20 }} onClick={() => setValue(defaultValue)}>
                reset
            </button>
            <MarkdownEditor.Root value={value} onChange={handleChange}>
                <MarkdownEditor.Tabs.List>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.EDIT}
                        key={MarkdownEditor.MarkdownEditorMode.EDIT}
                    >
                        edit
                    </MarkdownEditor.Tabs.Trigger>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.PREVIEW}
                        key={MarkdownEditor.MarkdownEditorMode.PREVIEW}
                    >
                        preview
                    </MarkdownEditor.Tabs.Trigger>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.SPLIT}
                        key={MarkdownEditor.MarkdownEditorMode.SPLIT}
                    >
                        split
                    </MarkdownEditor.Tabs.Trigger>
                </MarkdownEditor.Tabs.List>

                <MarkdownEditor.Edit />
                <MarkdownEditor.Preview />
                <MarkdownEditor.Split />
            </MarkdownEditor.Root>
        </div>
    );
};

export const Disabled = () => {
    return (
        <div style={{ width: '100%', height: 500 }}>
            <MarkdownEditor.Root value={defaultValue} disabled>
                <MarkdownEditor.Tabs.List>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.EDIT}
                        key={MarkdownEditor.MarkdownEditorMode.EDIT}
                    >
                        edit
                    </MarkdownEditor.Tabs.Trigger>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.PREVIEW}
                        key={MarkdownEditor.MarkdownEditorMode.PREVIEW}
                    >
                        preview
                    </MarkdownEditor.Tabs.Trigger>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.SPLIT}
                        key={MarkdownEditor.MarkdownEditorMode.SPLIT}
                    >
                        split
                    </MarkdownEditor.Tabs.Trigger>
                </MarkdownEditor.Tabs.List>

                <MarkdownEditor.Edit />
                <MarkdownEditor.Preview />
                <MarkdownEditor.Split />
            </MarkdownEditor.Root>
        </div>
    );
};
