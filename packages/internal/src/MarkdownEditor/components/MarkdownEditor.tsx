import { memo } from 'react';
import { MarkdownEditor as MDE } from '@optimacros-ui/kit/src/components/MarkdownEditor/src';

export interface MarkdownEditorProps {
    onChange: (value: string) => void;
    value: string;
    className?: string;

    // resizable?: boolean | string;
    height?: number;

    editTabLabel?: string;
    previewTabLabel?: string;
    splitTabLabel?: string;
}

export const MarkdownEditor = memo<MarkdownEditorProps>(
    ({
        editTabLabel = 'Editor',
        previewTabLabel = 'Preview',
        splitTabLabel = 'Split',
        height,
        ...rest
    }) => (
        <MDE.Root activeTab={MDE.MarkdownEditorMode.SPLIT} {...rest}>
            <MDE.Tabs.List>
                <MDE.Tabs.Trigger
                    value={MDE.MarkdownEditorMode.EDIT}
                    key={MDE.MarkdownEditorMode.EDIT}
                >
                    {editTabLabel}
                </MDE.Tabs.Trigger>
                <MDE.Tabs.Trigger
                    value={MDE.MarkdownEditorMode.PREVIEW}
                    key={MDE.MarkdownEditorMode.PREVIEW}
                >
                    {previewTabLabel}
                </MDE.Tabs.Trigger>
                <MDE.Tabs.Trigger
                    value={MDE.MarkdownEditorMode.SPLIT}
                    key={MDE.MarkdownEditorMode.SPLIT}
                >
                    {splitTabLabel}
                </MDE.Tabs.Trigger>
            </MDE.Tabs.List>

            <MDE.Edit style={{ height }} />
            <MDE.Preview style={{ height }} />
            <MDE.Split style={{ height }} />
        </MDE.Root>
    ),
);
