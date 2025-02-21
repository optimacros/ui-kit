import { ConnectMachine } from '@optimacros-ui/store';
import { State, Context } from './machine';
import { omit } from '@optimacros-ui/utils';
import * as machine from '@zag-js/menu';

export const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        orientation: state.context.orientation,
        setOrientation(orientation: string) {
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
        getItemProps(props: machine.ItemProps) {
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
}) satisfies ConnectMachine<machine.Api, Context, State>;
