import { fn } from '@storybook/test';
import { Modal } from '..';

export const props: Partial<Modal.Props> = {
    open: false,
    onOpenChange: fn(),
    onEscapeKeyDown: fn(),
    onPointerDownOutside: fn(),
    onInteractOutside: fn(),
    preventScroll: true,
    trapFocus: true,
    closeOnEscape: true,
    closeOnInteractOutside: true,
};
