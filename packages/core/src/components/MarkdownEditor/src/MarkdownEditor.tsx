import { forward, styled } from '@optimacros-ui/store';
import { RootProvider, useApi } from './context';
import { ChangeEvent, PropsWithChildren } from 'react';
import { Tabs } from '@optimacros-ui/tabs';

export interface MarkdownEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    activeTab?: MarkdownEditorMode;
    disabled?: boolean;
}

export enum MarkdownEditorMode {
    EDIT = 'edit',
    PREVIEW = 'preview',
    SPLIT = 'split',
}

export const Root = forward<PropsWithChildren<MarkdownEditorProps>, 'div'>(
    ({ children, value, onChange, activeTab, disabled, ...rest }, ref) => {
        return (
            <styled.div
                {...rest}
                ref={ref}
                data-scope="markdown-editor"
                data-part="root"
                data-disabled={disabled}
            >
                <RootProvider value={value} onChange={onChange} activeTab={activeTab}>
                    {children}
                </RootProvider>
            </styled.div>
        );
    },
    { displayName: 'MarkdownEditorRoot' },
);

export const EditComponent = forward<{}, HTMLTextAreaElement>(
    (props, ref) => {
        const { value, setValue } = useApi();

        const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);
        };

        return (
            <styled.div {...props} data-scope="markdown-editor" data-part="edit">
                <styled.textarea
                    value={value}
                    ref={ref}
                    onChange={handleChange}
                    data-scope="markdown-editor"
                    data-part="textarea"
                    data-role="scroll-container"
                    aria-label="textarea"
                />
            </styled.div>
        );
    },
    { displayName: 'EditComponent' },
);

export const Edit = forward<{}, HTMLTextAreaElement>(
    (props, ref) => (
        <Tabs.Content value={MarkdownEditorMode.EDIT}>
            <EditComponent {...props} ref={ref} />
        </Tabs.Content>
    ),
    { displayName: 'Edit' },
);

export const PreviewComponent = forward<{}, 'div'>(
    (props, ref) => {
        const { value, parse } = useApi();

        const markdown = parse(value);

        return (
            <styled.div
                {...props}
                ref={ref}
                dangerouslySetInnerHTML={{
                    __html: markdown,
                }}
                data-scope="markdown-editor"
                data-part="preview"
                data-role="scroll-container"
                aria-label="textarea"
            />
        );
    },
    { displayName: 'PreviewComponent' },
);

export const Preview = forward<{}, 'div'>(
    (props, ref) => (
        <Tabs.Content value={MarkdownEditorMode.PREVIEW}>
            <PreviewComponent {...props} ref={ref} />
        </Tabs.Content>
    ),
    { displayName: 'Preview' },
);

export const Split = forward<{}, 'div'>(
    (props, ref) => (
        <Tabs.Content value={MarkdownEditorMode.SPLIT}>
            <styled.div {...props} ref={ref} data-scope="markdown-editor" data-part="split">
                <EditComponent />
                <PreviewComponent />
            </styled.div>
        </Tabs.Content>
    ),
    { displayName: 'Split' },
);

export { Tabs };
