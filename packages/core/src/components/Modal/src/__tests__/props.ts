import { fn } from '@storybook/test';
import { Modal } from '..';

export const props: Partial<Modal.Props> = {
    controllable: true,
    open: false,
    'open.controlled': false,
    onOpenChange: fn(),
    onEscapeKeyDown: fn(),
    onPointerDownOutside: fn(),
    onInteractOutside: fn(),
    preventScroll: true,
    trapFocus: true,
    closeOnEscape: true,
    closeOnInteractOutside: true,
};
