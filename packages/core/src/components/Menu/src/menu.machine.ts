import { extendMachine } from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';

export const machine = extendMachine(
    zagMenu,
    {
        context: {
            orientation: Orientation.Vertical,
            disabled: false,
            hoverable: false,
        },
        on: {
            'ORIENTATION.SET': { actions: 'setOrientation' },
            'DISABLED.SET': { actions: 'setDisabled' },
        },
    },
    {
        actions: {
            setOrientation: (ctx, evt) => {
                ctx.orientation = evt.value;
            },
            setDisabled: (ctx, evt) => {
                ctx.disabled = evt.value;
            },
        },
    },
);
