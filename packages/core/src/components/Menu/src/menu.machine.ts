import {
    ConnectMachine,
    ExtendedMachine,
    extendMachine,
    MachineConfig,
    MachineOptions,
} from '@optimacros-ui/store';
import { omit, Orientation } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';

const config = {
    context: {
        orientation: Orientation.Vertical,
        disabled: false,
        hoverable: false,
    },
    on: {
        'ORIENTATION.SET': { actions: 'setOrientation' },
        'DISABLED.SET': { actions: 'setDisabled' },
        'SUBMENU.SET': { actions: 'setSubmenuVisible' },
    },
} satisfies MachineConfig<zagMenu.Service>;

const options = {
    actions: {
        setOrientation: (ctx, evt) => {
            ctx.orientation = evt.value;
        },
        setDisabled: (ctx, evt) => {
            ctx.disabled = evt.value;
        },
    },
} satisfies MachineOptions<zagMenu.Service, zagMenu.Context, typeof config>;

export const machine: ExtendedMachine<
    typeof zagMenu,
    zagMenu.Service,
    zagMenu.Context,
    typeof config
> = extendMachine(zagMenu, config, options);

export type Machine = typeof machine;

export const connect: ConnectMachine<Machine> = (api, { state, send }, machine) => {
    return {
        ...api,
        orientation: state.context.orientation,
        setOrientation(orientation) {
            send({ type: 'ORIENTATION.SET', value: orientation });
        },
        setSubmenuVisible(value: boolean) {
            send({ type: 'SUBMENU.SET', value });
        },
        getContentProps() {
            return { ...api.getContentProps(), 'data-orientation': state.context.orientation };
        },
        getTriggerProps() {
            const props = api.getTriggerProps();

            return {
                ...props,
                onClick: (e) => {
                    if (!state.context.disabled) {
                        props.onClick(e);
                    }
                },
                'data-disabled': state.context.disabled ?? undefined,
            };
        },
        getItemProps(props: zagMenu.ItemProps) {
            return {
                ...api.getItemProps(props),
                title: props.valueText,
            };
        },
        setParentNode: (parent) => {
            api.setParent(parent.machine);
            parent.setChild(machine);
        },
        getTriggerItemProps(parent) {
            const props = api.getTriggerItemProps(parent);

            if (!state.context.hoverable) {
                return {
                    ...omit(props, ['onPointerDown', 'onPointerLeave', 'onPointerMove']),
                    // some zagjs shit
                    'data-disabled': props['data-disabled'] === true ? true : undefined,
                };
            }

            return {
                ...props,
                // some zagjs shit
                'data-disabled': props['data-disabled'] === true ? true : undefined,
            };
        },
    };
};
