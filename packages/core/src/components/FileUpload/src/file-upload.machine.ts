import {
    ConnectMachine,
    ExtendedMachine,
    extendMachine,
    MachineConfig,
    MachineOptions,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import * as zagMachine from '@zag-js/file-upload';
import { PropTypes } from '@zag-js/types';

const config = {
    context: {
        onReset: () => {},
    } as {
        onReset?: () => void;
    },
} satisfies MachineConfig<zagMachine.Service>;

const options = (service: zagMachine.Service) =>
    ({
        actions: {
            clearFiles: (ctx) => {
                ctx.onReset();
                service.options.actions.clearFiles(ctx);
            },
        },
    }) satisfies MachineOptions<zagMachine.Service, zagMachine.Context, typeof config>;

type State = UserState<typeof zagMachine>;
type Context = UserContext<zagMachine.Context, typeof config>;

export const machine = extendMachine(zagMachine, config, options) satisfies ExtendedMachine<
    typeof zagMachine,
    Context,
    State
>;

export const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        //@ts-ignore
        acceptedFiles: state.context.acceptedFiles,
    };
}) satisfies ConnectMachine<zagMachine.Api<PropTypes>, Context, State>;
