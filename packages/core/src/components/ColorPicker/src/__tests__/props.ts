import { ColorPicker } from '..';
import { fn } from '@storybook/test';

export const props: Omit<ColorPicker.RootProps, 'children'> = {
    open: false,
    'open.controlled': false,
    onOpenChange: fn(),
    controllable: true,
};
