import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { Sidebar } from '..';

export const props: Partial<ComponentProps<typeof Sidebar.Root>> = {
    open: false,
    position: 'right',
    onOpenChange: fn(),
    disabled: false,
    width: 300,
};
