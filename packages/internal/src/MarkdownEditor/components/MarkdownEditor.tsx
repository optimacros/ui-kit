import { memo, useEffect, useMemo, useRef, KeyboardEvent, useCallback } from 'react';
import { MarkdownEditor as MDE } from '@optimacros-ui/markdown-editor';

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
        value,
        onChange,
        ...rest
    }) => {
        const rootRef = useRef<HTMLDivElement>();

        const tabs = useMemo<MDE.Tabs.Tab[]>(() => {
            return [
                { id: MDE.MarkdownEditorMode.EDIT, title: editTabLabel },
                { id: MDE.MarkdownEditorMode.PREVIEW, title: previewTabLabel },
                { id: MDE.MarkdownEditorMode.SPLIT, title: splitTabLabel },
            ];
        }, [editTabLabel, previewTabLabel, splitTabLabel]);

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
                activeTab={tabs[0].id}
                data-resizable={resizableState}
                {...rest}
                value={value}
                onChange={onChange}
                ref={rootRef}
                tabs={tabs}
            >
                <MDE.Tabs.List>
                    {(tabs) =>
                        tabs.map((tab) => (
                            <MDE.Tabs.Trigger id={tab.id} key={tab.id}>
                                {tab.title}
                            </MDE.Tabs.Trigger>
                        ))
                    }
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
