import {
    ConnectZagApi,
    createMachineContext,
    extendMachine,
    ExtendSchema,
} from '@optimacros-ui/store';
import { omit, Orientation, OrientationString } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';
import { UiKit } from '@optimacros-ui/kit-store';

type Schema = ExtendSchema<
    typeof zagMenu,
    {
        props: {
            orientation?: OrientationString;
            disabled?: boolean;
            hoverable?: boolean;
        };
        context: {
            orientation?: OrientationString;
            disabled?: boolean;
            hoverable?: boolean;
        };
    }
>;

export const machine = extendMachine<Schema, typeof zagMenu>(zagMenu, {
    context(params) {
        const { bindable } = params;
        return {
            ...zagMenu.machine.context(params),
            disabled: bindable<Schema['context']['disabled']>(() => ({
                defaultValue: false,
            })),
            hoverable: bindable<Schema['context']['hoverable']>(() => ({
                defaultValue: false,
            })),
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
                    if (!service.context.get('disabled')) {
                        props.onClick(e);
                    }
                },
                'data-disabled': service.context.get('disabled') ?? undefined,
            };
        },
        getItemProps(props: zagMenu.ItemProps) {
            return {
                ...api.getItemProps(props),
                title: props.valueText,
            };
        },
        setParentNode: (parent: { api: zagMenu.Api; service: typeof service }) => {
            parent.api.setChild(service);
            api.setParent(parent.service);
        },
        getTriggerItemProps(parent) {
            const props = api.getTriggerItemProps(parent);

            if (!service.context.get('hoverable')) {
                return {
                    ...omit(props, ['onPointerDown', 'onPointerLeave', 'onPointerMove']),
                    'data-disabled': props['data-disabled'] === true ? true : undefined,
                };
            }

            return {
                ...props,
                'data-disabled': props['data-disabled'] === true ? true : undefined,
            };
        },
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
