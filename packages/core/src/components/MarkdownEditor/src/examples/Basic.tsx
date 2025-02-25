import { Flex } from '@optimacros-ui/flex';
import { MarkdownEditor } from '..';

export const Basic = (props: MarkdownEditor.MarkdownEditorProps) => {
    return (
        <Flex height={700}>
            <MarkdownEditor.Root {...props} data-testid="root">
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

                <MarkdownEditor.Edit data-testid="edit-tab" />
                <MarkdownEditor.Preview data-testid="preview-tab" />
                <MarkdownEditor.Split data-testid="split-tab" />
            </MarkdownEditor.Root>
        </Flex>
    );
};
