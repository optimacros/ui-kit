import { useState } from 'react';
import { MarkdownEditor } from './index';

const meta = {
    title: 'UI Kit main/Markdown Editor V2',
};
export default meta;

export const Basic = () => {
    const [value, setValue] = useState('');

    const handleChange = (v: string) => setValue(v);

    return (
        <div style={{ width: '100%', height: 500 }}>
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
