import * as collapsible from '@zag-js/collapsible';
import {
    ConnectMachine,
    createMachineContext,
    ExtendedMachine,
    forward,
    MachineConfig,
    MachineOptions,
    styled,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import { PropsWithChildren } from 'react';
import { extendMachine } from '@optimacros-ui/store';

const config = {
    context: {
        width: 300,
        position: 'right',
    } as {
        width?: number;
        position?: 'left' | 'right';
    },
    on: {
        'WIDTH.SET': { actions: 'setWidth' },
        'POSITION.SET': { actions: 'setPosition' },
        TOGGLE: { actions: 'toggle' },
    },
} satisfies MachineConfig<collapsible.Service>;

const options = {
    actions: {
        setWidth: (ctx, evt) => {
            ctx.width = evt.value;
        },
        setPosition: (ctx, evt) => {
            ctx.position = evt.value;
        },
        toggle: (ctx, evt) => {
            ctx.open = !ctx.open;
        },
    },
} satisfies MachineOptions<collapsible.Service, collapsible.Context, typeof config>;

type State = UserState<typeof collapsible>;
type Context = UserContext<collapsible.Context, typeof config>;

export const machine = extendMachine(collapsible, config, options) satisfies ExtendedMachine<
    typeof collapsible,
    Context,
    State
>;

const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        setWidth: (value) => send({ type: 'WIDTH.SET', value }),
        getPanelProps() {
            return {
                ...api.getRootProps(),
                'data-tag': 'sidebar',
                'data-position': state.context.position,
                style: { width: api.open ? state.context.width : 0 },
            };
        },
        getHeaderProps() {
            return {
                'data-tag': 'sidebar',
                'data-scope': 'collapsible',
                'data-part': 'header',
                'data-position': state.context.position,
            };
        },
        getMiniPanelProps() {
            return {
                'data-position': state.context.position,
                'data-disabled': state.context.disabled,
                'data-tag': 'sidebar',
                'data-scope': 'collapsible',
                'data-part': 'mini-panel',
                onClick: () => api.setOpen(true),
            };
        },
        getCloseTriggerProps() {
            return {
                'data-position': state.context.position,
                'data-tag': 'sidebar',
                'data-scope': 'collapsible',
                'data-part': 'close-trigger',
                onClick: () => api.setOpen(false),
            };
        },
        getTriggerProps() {
            return {
                'data-position': state.context.position,
                'data-tag': 'sidebar',
                'data-scope': 'collapsible',
                'data-part': 'trigger',
                onClick: () => send('TOGGLE'),
            };
        },
    };
}) satisfies ConnectMachine<collapsible.Api, Context, State>;

export type Machine = typeof machine;

export const {
    Api,
    useApi,
    RootProvider: Root,
    splitProps,
    useProxySelector,
    useSelector,
} = createMachineContext({
    id: 'collapsible',
    machine,
    connect,
});

export const Panel = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getPanelProps()} ref={ref}>
                {children}
            </styled.div>
        );
    },
    { displayName: 'Panel' },
);

export const Header = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getHeaderProps()} ref={ref} />;
    },
    { displayName: 'Header' },
);

export const Content = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div
            {...rest}
            ref={ref}
            data-tag="sidebar"
            data-scope="collapsible"
            data-part="content-outer"
        >
            <styled.div
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="content-inner"
                data-role="scroll-container"
            >
                {children}
            </styled.div>
        </styled.div>
    ),
    { displayName: 'Content' },
);

export const MiniPanel = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        if (api.open) {
            return null;
        }

        return <styled.div {...props} {...api.getMiniPanelProps()} ref={ref} />;
    },
    { displayName: 'MiniPanel' },
);

export const CloseTrigger = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getCloseTriggerProps()} ref={ref}>
                {children}
            </styled.div>
        );
    },
    { displayName: 'CloseTrigger' },
);

export const Trigger = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getTriggerProps()} ref={ref}>
                {children}
            </styled.div>
        );
    },
    { displayName: 'Trigger' },
);
