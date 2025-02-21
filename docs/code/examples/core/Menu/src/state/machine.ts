import {
    ExtendedMachine,
    extendMachine,
    MachineConfig,
    MachineOptions,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';

const config = {
    context: {
        orientation: Orientation.Vertical,
        disabled: false,
        hoverable: false,
    } as {
        orientation?: string;
        disabled?: boolean;
        hoverable?: boolean;
    },
    on: {
        'ORIENTATION.SET': { actions: 'setOrientation' },
        'DISABLED.SET': { actions: 'setDisabled' },
        'SUBMENU.SET': { actions: 'setSubmenuVisible' },
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

export type State = UserState<typeof zagMenu>;
export type Context = UserContext<zagMenu.Context, typeof config>;

export const machine = extendMachine(zagMenu, config, options) satisfies ExtendedMachine<
    typeof zagMenu,
    Context,
    State
>;

export type Machine = typeof machine;
