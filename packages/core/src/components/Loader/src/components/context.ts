import { createReactApiStateContext } from '@optimacros-ui/store';
import { extendMachine } from '@optimacros-ui/store';
import * as loader from '@zag-js/progress';

export const machine = extendMachine(
    loader,
    {
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
    },
    {
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
    },
);

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
