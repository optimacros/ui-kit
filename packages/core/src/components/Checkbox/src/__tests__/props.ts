import { ComponentProps } from 'react';
import { Checkbox } from '..';
import { fn } from '@storybook/test';

export const props: Omit<ComponentProps<typeof Checkbox.Root>, 'children'> = {
    checked: undefined,
    onCheckedChange: fn(),
    disabled: false,
    controllable: true,
};
