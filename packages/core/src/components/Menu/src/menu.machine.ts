import { Zag, createMachineContext, extendMachine } from '@optimacros-ui/store';
import { omit, Orientation, OrientationString } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';
import { UiKit } from '@optimacros-ui/kit-store';
import { normalizeProps, useMachine } from '@zag-js/react';
import { createContext, MouseEventHandler, useContext, useEffect } from 'react';

export type Schema = Zag.ExtendModuleSchema<
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
        const { bindable, prop } = params;
        return {
            ...zagMenu.machine.context(params),
            orientation: bindable<Schema['context']['orientation']>(() => ({
                defaultValue: Orientation.Vertical,
                value: prop('orientation'),
            })),
        };
    },
});

export type Machine = typeof machine;

const connect = ((api, service) => {
    return {
        ...api,
        getParent: () => service.refs.get('parent') as Zag.Service<Schema>,
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
        getItemProps({
            onClick,
            ...rest
        }: zagMenu.ItemProps & { onClick?: MouseEventHandler<any> }) {
            const itemProps = api.getItemProps(rest);
            return {
                ...itemProps,
                onClick: (e) => {
                    onClick?.(e);
                    itemProps.onClick?.(e);
                },
                title: rest.valueText,
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
}) satisfies Zag.ConnectApi<Schema, zagMenu.Api>;

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

export type Props = Partial<Schema['props']>;

export const SubMenuContext = createContext<ReturnType<typeof useState>>(null);

export function useSubmenu(parent: ReturnType<typeof useState>, props: Partial<Schema['props']>) {
    const isEnabled = useFeatureFlags('submenu');

    const service = useMachine(machine.machine, props);
    const api = connect(machine.connect(service, normalizeProps), service);

    useEffect(() => {
        if (!isEnabled) {
            console.warn('submenu feature is disabled');
        } else {
            parent.api.setChild(service);
            api.setParent(parent.service);
        }
    }, []);

    return {
        service,
        api,
        //@ts-ignore
        props: parent.api.getTriggerItemProps(api),
    };
}

export function useSubmenuApi() {
    const context = useContext(SubMenuContext);

    return context?.api;
}
