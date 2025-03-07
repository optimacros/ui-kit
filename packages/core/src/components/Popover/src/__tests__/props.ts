import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { Popover } from '..';

export const props: Partial<ComponentProps<typeof Popover.Root>> = {
    open: undefined,
    defaultOpen: false,
    onOpenChange: fn(),
    onEscapeKeyDown: fn(),
    onPointerDownOutside: fn(),
    onFocusOutside: fn(),
    onInteractOutside: fn(),
    closeOnInteractOutside: true,
    closeOnEscape: true,
    modal: false,
    positioning: undefined,
    autoFocus: true,
};
