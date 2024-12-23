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
        },
        on: {
            'MULTICOLOR.SET': { actions: 'setMulticolor' },
            START: { actions: 'start' },
        },
    },
    {
        actions: {
            setMulticolor: (ctx, evt) => {
                ctx.multicolor = evt.value;
            },
            start: (ctx) => {
                ctx.running = true;

                const timer = setInterval(() => {
                    if (ctx.isAtMax) {
                        ctx.value = 0;
                    }

                    ctx.value += ctx.step;
                }, ctx.speed);

                ctx.onCancel = () => {
                    clearInterval(timer);

                    ctx.running = false;
                };
            },
        },
    },
);

export const { Api, useApi, RootProvider } = createReactApiStateContext({
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
        };
    },
});
