import { fn } from '@storybook/test';
import { Favourite } from '..';

export const props: Omit<Favourite.RootProps, 'children'> = {
    checked: undefined,
    defaultChecked: false,
    onCheckedChange: fn(),
    disabled: false,
};
