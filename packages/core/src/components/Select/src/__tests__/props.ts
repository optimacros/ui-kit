import { ComponentProps } from 'react';
import { Select } from '..';
import { mockItems } from '../mock';
import { fn } from '@storybook/test';

export const props: Partial<ComponentProps<typeof Select.Root>> = {
    items: mockItems,
    value: undefined,
    defaultValue: undefined,
    onValueChange: fn(),
    onOpenChange: fn(),
    open: undefined,
    defaultOpen: false,
    deselectable: false,
    multiple: false,
    closeOnSelect: true,
    disabled: false,
    readOnly: false,
    invalid: false,
    required: false,
    positioning: undefined,
};
