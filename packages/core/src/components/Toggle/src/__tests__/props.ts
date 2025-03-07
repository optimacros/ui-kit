import { fn } from '@storybook/test';
import { Toggle } from '..';
import { ComponentProps } from 'react';

export const props: Partial<ComponentProps<typeof Toggle>> = {
    checked: undefined,
    defaultChecked: true,
    onCheckedChange: fn(),
    value: 'checked',
    disabled: false,
    readOnly: false,
    invalid: false,
};
