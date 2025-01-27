import {
    createReactApiStateContext,
    ExtendedMachine,
    MachineConfig,
    MachineOptions,
} from '@optimacros-ui/store';
import { extendMachine } from '@optimacros-ui/store';
import * as loader from '@zag-js/progress';

const config = {
    context: {
        onCancel: () => {},
        multicolor: false,
        speed: 100,
        step: 1,
        running: false,
        disabled: false,
        infinite: false,
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

            if (ctx.isAtMax && !ctx.infinite) {
                ctx.value = 0;
            }

            ctx.running = true;

            const timer = setInterval(() => {
                ctx.value += ctx.step;

                if (ctx.isAtMax) {
                    if (!ctx.infinite) {
                        send('STOP');
                    } else {
                        ctx.value = 0;
                    }
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

export const machine: ExtendedMachine<
    typeof loader,
    loader.Service,
    loader.Context,
    typeof config
> = extendMachine(loader, config, options);

export type Machine = typeof machine;

export const { Api, useApi, RootProvider, useProxySelector, useSelector, splitProps } =
    createReactApiStateContext({
        id: 'progress',
        machine,
        connect(api, { state, send }, machine) {
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
                    };
                },
            };
        },
    });
