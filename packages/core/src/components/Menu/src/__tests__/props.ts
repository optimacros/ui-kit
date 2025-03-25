import { Orientation } from '@optimacros-ui/utils';
import type { Props } from '../menu.machine';
import { fn } from '@storybook/test';

export const props: Partial<Props> = {
    open: undefined,
    defaultOpen: false,
    highlightedValue: undefined,
    defaultHighlightedValue: undefined,
    onHighlightChange: fn(),
    onOpenChange: fn(),
    onSelect: fn(),
    closeOnSelect: true,
    disabled: false,
    positioning: {
        placement: 'bottom',
        gutter: 4,
        offset: { mainAxis: 0, crossAxis: 0 },
        strategy: 'absolute',
    },
    loopFocus: false,
    orientation: Orientation.Vertical,
};
