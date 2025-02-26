import {
    ConnectZagApi,
    createMachineContext,
    extendMachine,
    ExtendSchema,
} from '@optimacros-ui/store';
import * as zagMachine from '@zag-js/file-upload';
import { PropTypes } from '@zag-js/types';

type Schema = ExtendSchema<
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
    };
}) satisfies ConnectZagApi<Schema, zagMachine.Api<PropTypes>>;

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
