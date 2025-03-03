import { fn } from '@storybook/test';
import { Tooltip } from '..';

export const props: Partial<Tooltip.RootProps> = {
    controllable: false,
    positioning: undefined,
    openDelay: 400,
    closeDelay: 200,
    interactive: false,
    disabled: false,
    open: false,
    'open.controlled': false,
    onOpenChange: fn(),
};
