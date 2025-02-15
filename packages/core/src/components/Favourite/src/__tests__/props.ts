import { fn } from '@storybook/test';
import { Favourite } from '..';

export const props: Omit<Favourite.RootProps, 'children'> = {
    checked: false,
    onCheckedChange: fn(),
    disabled: false,
    controllable: false,
};
