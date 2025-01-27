import {
    ExtendedMachine,
    extendMachine,
    MachineConfig,
    MachineOptions,
} from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';

const config = {
    context: {
        orientation: Orientation.Vertical,
        disabled: false,
        hoverable: false,
    },
    on: {
        'ORIENTATION.SET': { actions: 'setOrientation' },
        'DISABLED.SET': { actions: 'setDisabled' },
    },
} satisfies MachineConfig<zagMenu.Service>;

const options = {
    actions: {
        setOrientation: (ctx, evt) => {
            ctx.orientation = evt.value;
        },
        setDisabled: (ctx, evt) => {
            ctx.disabled = evt.value;
        },
    },
} satisfies MachineOptions<zagMenu.Service, zagMenu.Context, typeof config>;

export const machine: ExtendedMachine<
    typeof zagMenu,
    zagMenu.Service,
    zagMenu.Context,
    typeof config
> = extendMachine(zagMenu, config, options);

export type Machine = typeof machine;
