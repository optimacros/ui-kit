import { memo, useEffect, useMemo, useRef, KeyboardEvent, useCallback } from 'react';
import { MarkdownEditor as MDE } from '@optimacros-ui/markdown-editor';
import { forward } from '@optimacros-ui/store';
import { Resizable } from '@optimacros-ui/resizable';
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

export const MarkdownEditor = memo(
    forward<MarkdownEditorProps, HTMLTextAreaElement>(
        (
            {
                editTabLabel = 'Editor',
                previewTabLabel = 'Preview',
                splitTabLabel = 'Split',
                height,
                resizable,
                value,
                onChange,
                ...rest
            },
            ref,
        ) => {
            const rootRef = useRef<HTMLDivElement>();

            const handleKeyDown = useCallback<EventListener>(
                (event) => {
                    if ((event as unknown as KeyboardEvent<HTMLTextAreaElement>).key === 'Tab') {
                        event.preventDefault();

                        const textArea = event.target as HTMLTextAreaElement;

                        const { selectionStart, selectionEnd } = textArea;

                        onChange(
                            `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`,
                        );

                        setTimeout(() => {
                            textArea.selectionStart = selectionStart + 1;
                            textArea.selectionEnd = selectionStart + 1;
                        }, 10);
                    }
                },
                [value, onChange],
            );

            useEffect(() => {
                if (!rootRef?.current) {
                    return;
                }

                const textAreaList = [
                    ...rootRef.current.querySelectorAll(`textarea[data-scope='markdown-editor']`),
                ] as HTMLTextAreaElement[];

                textAreaList.forEach((area) => {
                    area.addEventListener('keydown', handleKeyDown);
                });

                return () => {
                    textAreaList.forEach((area) => {
                        area.removeEventListener('keydown', handleKeyDown);
                    });
                };
            }, [handleKeyDown]);

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
                    activeTab={MDE.MarkdownEditorMode.EDIT}
                    data-resizable={resizableState}
                    {...rest}
                    value={value}
                    onChange={onChange}
                    ref={rootRef}
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
                    <Resizable.Root
                        axis="y"
                        width={500}
                        height={height}
                        minConstraints={[150, 150]}
                    >
                        <>
                            <MDE.Edit ref={ref} />
                            <MDE.Preview />
                            <MDE.Split />
                        </>
                    </Resizable.Root>
                </MDE.Root>
            );
        },
    ),
);
