import { Zag, createMachineContext, extendMachine } from '@optimacros-ui/store';
import * as zagMachine from '@zag-js/file-upload';

type Schema = Zag.ExtendModuleSchema<
    typeof zagMachine,
    {
        props: {
            onReset?: () => void;
        };
    }
>;

export const machine = extendMachine<Schema, typeof zagMachine>(zagMachine, {
    props: (params) => {
        return {
            onReset: () => {},
            ...zagMachine.machine.props(params),
        };
    },
    implementations: {
        actions: {
            clearFiles: (ctx) => {
                ctx.prop('onReset')();
                zagMachine.machine.implementations.actions.clearFiles(ctx);
            },
        },
    },
});

export const connect = ((api, service) => {
    return {
        ...api,
        acceptedFiles: service.context.get('acceptedFiles'),
        getHiddenInputProps: () => {
            return {
                ...api.getHiddenInputProps(),
                'data-scope': 'file-input',
                'data-part': 'hidden-input',
            };
        },
    };
}) satisfies Zag.ConnectApi<Schema, zagMachine.Api<Zag.PropTypes>>;

export const {
    Api,
    RootProvider,
    useApi,
    splitProps,
    useProxySelector,
    useSelector,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'file-upload',
    machine,
    connect,
});

export type Props = Partial<Schema['props']>;
