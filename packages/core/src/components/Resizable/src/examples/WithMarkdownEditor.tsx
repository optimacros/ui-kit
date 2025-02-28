import { MarkdownEditor } from '@optimacros-ui/markdown-editor';
import { Resizable } from '@optimacros-ui/kit';

const defaultValue = `## heading

text

- list
- list
- list`;

export const WithMarkdownEditor = (props) => {
    return (
        <div style={{ width: '100%', height: 500 }}>
            <MarkdownEditor.Root value={defaultValue} {...props}>
                <MarkdownEditor.Tabs.List>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.EDIT}
                        key={MarkdownEditor.MarkdownEditorMode.EDIT}
                        data-testid="edit-trigger"
                    >
                        edit
                    </MarkdownEditor.Tabs.Trigger>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.PREVIEW}
                        key={MarkdownEditor.MarkdownEditorMode.PREVIEW}
                        data-testid="preview-trigger"
                    >
                        preview
                    </MarkdownEditor.Tabs.Trigger>
                    <MarkdownEditor.Tabs.Trigger
                        value={MarkdownEditor.MarkdownEditorMode.SPLIT}
                        key={MarkdownEditor.MarkdownEditorMode.SPLIT}
                        data-testid="split-trigger"
                    >
                        split
                    </MarkdownEditor.Tabs.Trigger>
                </MarkdownEditor.Tabs.List>
                <Resizable.Root axis="y" width={500} height={500} minConstraints={[150, 150]}>
                    <>
                        <MarkdownEditor.Edit data-testid="edit-tab" />
                        <MarkdownEditor.Preview data-testid="preview-tab" />
                        <MarkdownEditor.Split data-testid="split-tab" />
                    </>
                </Resizable.Root>
            </MarkdownEditor.Root>
        </div>
    );
};
