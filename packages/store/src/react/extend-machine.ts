import { merge } from '@optimacros-ui/utils';
import { MachineConfig } from '@zag-js/core';
import { ZagModule } from './types';

/**
 * method for extending {@link ZagMachine}
 * @param stateMachine - any zag-js like module
 * @example 'import * as menu from '@zag-js/menu'
 * @param configCreator - {@link AnyConfig}
 * @returns ZagJs module with mutated {@link ZagMachine} function
 */
export function extendMachine<
    Props extends Record<string, any> = Record<string, any>,
    Module extends ZagModule<any, any, any> = ZagModule<any, any, any>,
    Config extends MachineConfig<{ props: Props }> = MachineConfig<{ props: Props }>,
>(stateMachine: Module, config: Config) {
    const machine = {
        ...merge(true, stateMachine.machine, config),
        props(params) {
            return {
                ...stateMachine.machine.props?.(params),
                ...config.props?.(params),
            };
        },
        context(params) {
            return {
                ...stateMachine.machine.context?.(params),
                ...config.context?.(params),
            };
        },
    };

    const result: Module & {
        machine: MachineConfig<{ props: Props & ReturnType<Config['props']> }>;
    } = {
        ...stateMachine,
        machine,
    };

    return result;
}
