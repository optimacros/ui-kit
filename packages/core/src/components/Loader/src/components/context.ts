import {
    ConnectMachine,
    createReactApiStateContext,
    ExtendedMachine,
    MachineConfig,
    MachineOptions,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import { extendMachine } from '@optimacros-ui/store';
import * as loader from '@zag-js/progress';
import { PropTypes } from '@zag-js/types';

const config = {
    context: {
        onCancel: () => {},
        multicolor: false,
        speed: 100,
        step: 1,
        running: false,
        disabled: false,
        infinite: false,
        state: 'determinate',
    } as {
        onCancel?: () => void;
        multicolor?: boolean;
        speed?: number;
        step?: number;
        running?: boolean;
        disabled?: boolean;
        infinite?: boolean;
        state?: 'determinate' | 'indeterminate';
    },
    on: {
        'MULTICOLOR.SET': { actions: 'setMulticolor' },
        START: { actions: 'start' },
        STOP: { actions: 'stop' },
        RESTART: { actions: 'restart' },
    },
} satisfies MachineConfig<loader.Service>;

const options = {
    actions: {
        setMulticolor: (ctx, evt) => {
            ctx.multicolor = evt.value;
        },
        start: (ctx, evt, { send }) => {
            if (ctx.disabled || ctx.running) {
                return;
            }

            // а зачем нам это? вылидировать бы это все дело при маунте...
            if (ctx.value >= ctx.max && !ctx.infinite) {
                ctx.value = ctx.min;
            }

            ctx.running = true;

            const timer = setInterval(() => {
                const newValue = ctx.value + ctx.step;

                if (newValue >= ctx.max) {
                    if (!ctx.infinite) {
                        ctx.value = ctx.max;

                        send('STOP');
                    } else {
                        ctx.value = ctx.min;
                    }
                } else {
                    ctx.value = newValue;
                }
            }, ctx.speed);

            ctx.onCancel = () => {
                clearInterval(timer);

                ctx.running = false;
            };
        },
        stop: (ctx) => {
            ctx.running && ctx.onCancel();
        },
        restart: (ctx, evt, { send }) => {
            ctx.value = 0;
            send('START');
        },
    },
} satisfies MachineOptions<loader.Service, loader.Context, typeof config>;

type State = UserState<typeof loader>;
type Context = UserContext<loader.Context, typeof config>;

export const machine = extendMachine(loader, config, options) satisfies ExtendedMachine<
    typeof loader,
    Context,
    State
>;

export type Machine = typeof machine;

const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        step: state.context.step,
        speed: state.context.speed,
        onCancel: state.context.onCancel,
        start: () => {
            send('START');
        },
        getRootProps() {
            return {
                ...api.getRootProps(),
                'data-disabled': state.context.disabled,
                'data-multicolor': state.context.multicolor,
                'data-state': state.context.state,
            };
        },
    };
}) satisfies ConnectMachine<loader.Api<PropTypes>, Context, State>;

export const { Api, useApi, RootProvider, useProxySelector, useSelector, splitProps } =
    createReactApiStateContext({
        id: 'progress',
        machine,
        connect,
    });
