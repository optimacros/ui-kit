import { ComponentProps } from 'react';
import { Select } from '..';
import { mockItems } from '../mock';
import { fn } from '@storybook/test';

export const props: Partial<ComponentProps<typeof Select.Root>> = {
    items: mockItems,
    value: undefined,
    onValueChange: fn(),
    onOpenChange: fn(),
    open: undefined,
    deselectable: false,
    multiple: false,
    closeOnSelect: true,
    disabled: false,
    readOnly: false,
    invalid: false,
    required: false,
    positioning: undefined,
};
