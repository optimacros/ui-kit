import { fn } from '@storybook/test';

export const props = {
    controllable: true,
    open: false,
    'open.controlled': false,
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
