import { memo, useMemo } from 'react';
import { MarkdownEditor as MDE } from '@optimacros-ui/kit/src/components/MarkdownEditor/src';

import { ResizableBox } from 'react-resizable';
import 'node_modules/react-resizable/css/styles.css';
import { isNumber } from '@optimacros-ui/utils';

export interface MarkdownEditorProps {
    onChange: (value: string) => void;
    value: string;
    className?: string;
    resizable?: boolean | 'none';
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
        resizable,
        ...rest
    }) => {
        const resizableState = useMemo(() => {
            if (!isNumber(height)) {
                return false;
            }

            if (resizable === 'none') {
                return false;
            }

            return !!resizable;
        }, [resizable, height]);

        return (
            <MDE.Root
                activeTab={MDE.MarkdownEditorMode.SPLIT}
                data-resizable={resizableState}
                {...rest}
            >
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

                <ResizableBox axis="y" width={500} height={height} minConstraints={[150, 150]}>
                    <MDE.Edit />
                    <MDE.Preview />
                    <MDE.Split />
                </ResizableBox>
            </MDE.Root>
        );
    },
);
