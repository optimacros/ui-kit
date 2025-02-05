import type { RootProps } from '../Menu';
import { fn } from '@storybook/test';

export const props: Partial<RootProps> = {
    open: false,
    onOpenChange: fn(),
    'open.controlled': false,
    closeOnSelect: true,
    disabled: false,
    positioning: {
        placement: 'bottom',
        gutter: 4,
        offset: { mainAxis: 0, crossAxis: 0 },
        strategy: 'absolute',
    },
    loopFocus: false,
};
