import { normalizeProps, useActor, useMachine } from '@zag-js/react';
import { useId } from 'react';

export function createMachineApiHook<
    Ctx,
    Machine extends Record<string, any> = NonNullable<unknown>,
    ExtApi extends Record<string, any> = NonNullable<unknown>,
    ConnectApi extends (api: ReturnType<Machine['connect']>, send, stateMachine) => ExtApi = (
        api: ReturnType<Machine['connect']>,
        { state, send },
    ) => ExtApi,
>(machine: Machine, controllable?: boolean, connect?: ConnectApi) {
    const connectApi = (state, send, normalizeProps, stateMachine) => {
        const api = machine.connect(state, send, normalizeProps);

        return connect ? connect(api, { state, send, normalizeProps }, stateMachine) : api;
    };

    const uncontrollableHook = (context: Ctx) => {
        const id = useId();

        const [state, send, stateMachine] = useMachine(machine.machine({ id, ...context }));

        const api = connectApi(state, send, normalizeProps, stateMachine);

        return { api, send, state, machine: stateMachine };
    };

    const controllableHook = (context: Ctx, defaultContext: Ctx) => {
        const id = useId();

        const [state, send, stateMachine] = useMachine(machine.machine({ id, ...defaultContext }), {
            context,
        });

        const api = connectApi(state, send, normalizeProps, stateMachine);

        return { api, send, state, machine: stateMachine };
    };

    return controllable ? controllableHook : uncontrollableHook;
}

export function createActorApiHook<Machine extends Record<string, any> = NonNullable<unknown>>(
    machine: Machine,
) {
    return <Actor extends unknown>(actor: Actor) => {
        //@ts-ignore
        const [state, send] = useActor(actor);

        const api = machine.connect(state, send, normalizeProps);

        return { api, send, state };
    };
}
