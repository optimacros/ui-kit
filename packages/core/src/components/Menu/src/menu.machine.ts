import {
    ConnectZagApi,
    createMachineContext,
    extendMachine,
    ExtendSchema,
} from '@optimacros-ui/store';
import { omit, Orientation, OrientationString } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';
import { UiKit } from '@optimacros-ui/kit-store';
import type { Service } from '@zag-js/core';

export type Schema = ExtendSchema<
    typeof zagMenu,
    {
        props: {
            orientation?: OrientationString;
            disabled?: boolean;
            hoverable?: boolean;
        };
        context: {
            orientation?: OrientationString;
        };
    }
>;

export const machine = extendMachine<Schema, typeof zagMenu>(zagMenu, {
    context(params) {
        const { bindable } = params;
        return {
            ...zagMenu.machine.context(params),
            orientation: bindable<Schema['context']['orientation']>(() => ({
                defaultValue: Orientation.Vertical,
            })),
        };
    },
});

export type Machine = typeof machine;

export const connect = ((api, service) => {
    return {
        ...api,
        getParent: () => service.refs.get('parent') as Service<Schema>,
        orientation: service.context.get('orientation'),
        setOrientation(orientation: OrientationString) {
            service.context.set('orientation', orientation);
        },
        getContentProps() {
            return {
                ...api.getContentProps(),
                'data-orientation': service.context.get('orientation'),
            };
        },
        getTriggerProps() {
            const props = api.getTriggerProps();

            return {
                ...props,
                onClick: (e) => {
                    if (!service.prop('disabled')) {
                        props.onClick(e);
                    }
                },
                'data-disabled': service.prop('disabled') ?? undefined,
            };
        },
        getItemProps(props: zagMenu.ItemProps) {
            return {
                ...api.getItemProps(props),
                title: props.valueText,
            };
        },
        setParentNode: (parent: typeof service) => {
            parent.send({ type: 'CHILD.SET', value: service, id: service.prop('id') });
            service.send({ type: 'PARENT.SET', value: parent, id: parent.prop('id') });
        },
        getTriggerItemProps(childApi: zagMenu.Api) {
            const props = api.getTriggerItemProps(childApi);

            if (!service.prop('hoverable')) {
                return {
                    ...omit(props, ['onPointerDown', 'onPointerLeave', 'onPointerMove']),
                    'data-disabled': props['data-disabled'] === true ? true : undefined,
                };
            }

            return {
                ...props,
                'data-disabled': props['data-disabled'] === true ? true : undefined,
            } as Record<string, any>;
        },
        getSubMenuItemProps() {},
    };
}) satisfies ConnectZagApi<Schema, zagMenu.Api>;

export const {
    Api,
    useApi,
    RootProvider,
    useSelector,
    useProxySelector,
    useFeatureFlags,
    splitProps,
    select,
    slice,
    useState,
    State,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'menu',
    machine,
    connect,
    GlobalContext: UiKit,
});
