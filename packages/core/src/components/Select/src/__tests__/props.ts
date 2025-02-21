import { ComponentProps } from 'react';
import { Select } from '..';
import { mockItems } from '../mock';
import { fn } from '@storybook/test';

export const props: Partial<ComponentProps<typeof Select.Root>> = {
    controllable: true,
    items: mockItems,
    value: undefined,
    onValueChange: fn(),
    onOpenChange: fn(),
    open: undefined,
    'open.controlled': undefined,
    deselectable: false,
    multiple: false,
    closeOnSelect: true,
    disabled: false,
    readOnly: false,
    invalid: false,
    required: false,
    positioning: undefined,
};
