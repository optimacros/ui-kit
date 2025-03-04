import { Zag, createMachineContext } from '@optimacros-ui/store';
import { extendMachine } from '@optimacros-ui/store';
import * as loader from '@zag-js/progress';

type Schema = Zag.ExtendModuleSchema<
    typeof loader,
    {
        props: {
            onCancel?: () => void;
            multicolor?: boolean;
            speed?: number;
            step?: number;
            running?: boolean;
            defaultRunning?: boolean;
            disabled?: boolean;
            infinite?: boolean;
            state?: 'determinate' | 'indeterminate';
        };
        context: {
            multicolor?: boolean;
            running?: boolean;
            timer?: number;
            state?: 'determinate' | 'indeterminate';
        };
    }
>;

export const machine = extendMachine<Schema, typeof loader>(loader, {
    props(params) {
        return {
            speed: 100,
            step: 1,
            disabled: false,
            infinite: false,
            defaultRunning: false,
            onCancel: () => {},
            ...loader.machine.props(params),
        };
    },
    context(params) {
        const { bindable, prop } = params;

        return {
            ...loader.machine.context(params),
            multicolor: bindable(() => ({
                defaultValue: false,
            })),
            running: bindable(() => ({
                defaultValue: prop('defaultRunning'),
            })),
            state: bindable(() => ({
                defaultValue: 'determinate',
            })),
            timer: bindable(() => ({
                defaultValue: null,
            })),
        };
    },
    on: {
        'MULTICOLOR.SET': { actions: ['setMulticolor'] },
        START: { actions: ['start'] },
        STOP: { actions: ['stop'] },
        RESTART: { actions: ['restart'] },
    },
    implementations: {
        actions: {
            setMulticolor: (ctx) => {
                const { value } = ctx.event.current();

                ctx.context.set('multicolor', value);
            },
            start: ({ prop, context, send }) => {
                if (prop('disabled') || context.get('running')) {
                    return;
                }

                if (context.get('value') >= prop('max') && !prop('infinite')) {
                    context.set('value', prop('min'));
                }

                context.set('running', true);

                const timer = setInterval(() => {
                    const newValue = context.get('value') + prop('step');

                    if (newValue >= prop('max')) {
                        if (!prop('infinite')) {
                            context.set('value', prop('max'));

                            send({ type: 'STOP' });
                        } else {
                            context.set('value', prop('min'));
                        }
                    } else {
                        context.set('value', newValue);
                    }
                }, prop('speed'));

                context.set('timer', timer as unknown as number);
            },
            stop: ({ prop, context }) => {
                if (context.get('running') && !prop('disabled')) {
                    clearInterval(context.get('timer'));

                    context.set('running', false);

                    prop('onCancel')();
                }
            },
            restart: (ctx) => {
                ctx.context.set('value', 0);

                ctx.send({ type: 'START' });
            },
        },
    },
});

export type Machine = typeof machine;

const connect = ((api, service) => {
    return {
        ...api,
        step: service.prop('step'),
        speed: service.prop('speed'),
        onCancel: service.prop('onCancel'),
        start: () => {
            service.send({ type: 'START' });
        },
        stop: () => {
            service.send({ type: 'STOP' });
        },
        getRootProps() {
            return {
                ...api.getRootProps(),
                'data-disabled': service.prop('disabled'),
                'data-multicolor': service.prop('multicolor'),
                'data-state': service.prop('state'),
            };
        },
    };
}) satisfies Zag.ConnectApi<Schema, loader.Api<Zag.PropTypes>>;

export const {
    Api,
    useApi,
    RootProvider,
    useProxySelector,
    useSelector,
    splitProps,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'progress',
    machine,
    connect,
});
