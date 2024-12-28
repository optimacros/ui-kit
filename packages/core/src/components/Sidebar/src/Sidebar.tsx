import * as collapsible from '@zag-js/collapsible';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import {} from '@optimacros-ui/utils';
import { PropsWithChildren } from 'react';
import { extendMachine } from '@optimacros-ui/store';

export const machine = extendMachine(
    collapsible,
    {
        context: {
            width: 300,
            position: 'right' as 'left' | 'right',
        },
        on: {
            'WIDTH.SET': { actions: 'setWidth' },
            'POSITION.SET': { actions: 'setPosition' },
            TOGGLE: { actions: 'toggle' },
        },
    },
    {
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
    },
);

export const {
    Api,
    useApi,
    RootProvider: Root,
} = createReactApiStateContext({
    id: 'collapsible',
    machine,
    connect(api, { state, send }, machine) {
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
    },
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
