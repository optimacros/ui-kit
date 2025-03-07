import { ColorPicker } from '..';
import { fn } from '@storybook/test';

export const props: Omit<ColorPicker.RootProps, 'children'> = {
    open: undefined,
    defaultOpen: false,
    onOpenChange: fn(),
};
