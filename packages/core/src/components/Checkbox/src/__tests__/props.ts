import { fn } from '@storybook/test';
import { RootProps } from '../Checkbox';

export const props: Omit<RootProps, 'children'> = {
    checked: undefined,
    defaultChecked: undefined,
    onCheckedChange: fn(),
    disabled: false,
};
