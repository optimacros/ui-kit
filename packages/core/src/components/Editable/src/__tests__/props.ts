import { fn } from '@storybook/test';
import { EditableProps } from '../Editable';

export const props: EditableProps = {
    submitMode: 'both',
    value: '',
    edit: false,
    invalid: false,
    disabled: false,
    readOnly: false,
    required: false,
    placeholder: 'placeholder',
    maxLength: 100,
    autoResize: true,
    selectOnFocus: false,
    onValueChange: fn(),
    onValueCommit: fn(),
    onValueRevert: fn(),
    onEditChange: fn(),
};
