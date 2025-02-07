import { ComponentProps } from 'react';
import { Collapsible } from '..';
import { fn } from '@storybook/test';

export const props: ComponentProps<typeof Collapsible.Root> = {
    open: false,
    onOpenChange: fn(),
    'open.controlled': false,
    disabled: false,
    controllable: true,
};
