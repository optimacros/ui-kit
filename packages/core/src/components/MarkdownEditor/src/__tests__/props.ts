import { fn } from '@storybook/test';
import { MarkdownEditor } from '..';
import { defaultValue } from '../mock';

export const props: MarkdownEditor.MarkdownEditorProps = {
    value: defaultValue,
    disabled: false,
    onChange: fn(),
    activeTab: MarkdownEditor.MarkdownEditorMode.PREVIEW,
};
