import { ComponentProps } from 'react';
import { Collapsible } from '..';
import { fn } from '@storybook/test';

export const props: Omit<ComponentProps<typeof Collapsible.Root>, 'children'> = {
    open: false,
    onOpenChange: fn(),
    disabled: false,
};
