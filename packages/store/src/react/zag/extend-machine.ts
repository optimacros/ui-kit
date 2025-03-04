import { merge } from '@optimacros-ui/utils';
import { Zag } from './types';
import * as $ from '@optimacros-ui/types';
/**
 * method for extending {@link ZagMachine}
 * @param stateMachine - any zag-js like module
 * @example 'import * as menu from '@zag-js/menu'
 * @param configCreator - {@link AnyConfig}
 * @returns ZagJs module with mutated {@link ZagMachine} function
 */
export function extendMachine<
    Schema extends Zag.Schema,
    Module extends Zag.Module<any, any, any> = Zag.Module<any, any, any>,
    Config extends $.PartialDeep<Zag.Machine<Schema>> = $.PartialDeep<Zag.Machine<Schema>>,
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
        machine: Zag.Machine<Schema>;
    } = {
        ...stateMachine,
        machine,
    };

    return result;
}
