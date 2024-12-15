import { normalizeProps, useActor, useMachine } from '@zag-js/react';
import { useId } from 'react';

export function createMachineApiHook<
    Ctx,
    Machine extends Record<string, any> = NonNullable<unknown>,
>(machine: Machine) {
    return (context: Ctx) => {
        const [state, send, stateMachine] = useMachine(
            machine.machine({ id: useId(), ...context }),
        );

        const api = machine.connect(state, send, normalizeProps);

        return { api, send, state, machine: stateMachine };
    };
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
