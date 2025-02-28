import { fn } from '@storybook/test';
import { Switch } from '..';
import { ComponentProps } from 'react';

export const props: Partial<ComponentProps<typeof Switch.Root>> = {
    checked: true,
    onCheckedChange: fn(),
    value: 'checked',
    disabled: false,
    readOnly: false,
    required: false,
    invalid: false,
    controllable: false,
};
