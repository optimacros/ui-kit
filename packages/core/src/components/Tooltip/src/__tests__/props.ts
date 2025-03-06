import { fn } from '@storybook/test';
import { Tooltip } from '..';

export const props: Partial<Tooltip.RootProps> = {
    positioning: undefined,
    openDelay: 400,
    closeDelay: 200,
    interactive: false,
    disabled: false,
    open: undefined,
    defaultOpen: false,
    onOpenChange: fn(),
};
