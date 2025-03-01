import { merge } from '@optimacros-ui/utils';
import { MachineSchema as BaseSchema, Machine as MachineConfig } from '@zag-js/core';
import { ZagModule } from './types';
/**
 * method for extending {@link ZagMachine}
 * @param stateMachine - any zag-js like module
 * @example 'import * as menu from '@zag-js/menu'
 * @param configCreator - {@link AnyConfig}
 * @returns ZagJs module with mutated {@link ZagMachine} function
 */
export function extendMachine<
    Schema extends BaseSchema,
    Module extends ZagModule<any, any, any> = ZagModule<any, any, any>,
    Config extends Partial<MachineConfig<Schema>> = Partial<MachineConfig<Schema>>,
>(stateMachine: Module, config: Config) {
    const machine = {
        ...merge(true, stateMachine.machine, config),
        props: config.props ?? stateMachine.machine.props,
        context: config.context ?? stateMachine.machine.context,
        initialState(params) {
            return stateMachine.machine.initialState?.(params) ?? config.initialState?.(params);
        },
        refs: config.refs ?? stateMachine.machine.refs,
        watch(params) {
            stateMachine.machine.watch?.(params);
            config.watch?.(params);
        },
    };

    const result: Omit<Module, 'machine'> & {
        machine: MachineConfig<Schema>;
    } = {
        ...stateMachine,
        machine,
    };

    return result;
}
