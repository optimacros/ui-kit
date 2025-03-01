import * as collapsible from '@zag-js/collapsible';
import {
    ConnectZagApi,
    createMachineContext,
    ExtendSchema,
    forward,
    styled,
} from '@optimacros-ui/store';
import { PropsWithChildren } from 'react';
import { extendMachine } from '@optimacros-ui/store';

type Schema = ExtendSchema<
    typeof collapsible,
    {
        props: {
            width?: number;
            position?: 'left' | 'right';
        };
        action: 'setSize';
        event: {
            type: 'size.set';
            value: { height?: number; width?: number };
        };
    }
>;

export const machine = extendMachine<Schema, typeof collapsible>(collapsible, {
    props(params) {
        return {
            width: 300,
            position: 'right',
            ...(params.props as Schema['props']),
        };
    },
    on: {
        'size.set': { actions: ['setSize'] },
    },
    implementations: {
        actions: {
            setSize: ({ context, event }) => {
                const { value } = event;

                context.set('size', value);
            },
        },
    },
});

const connect = ((api, { send, prop }) => {
    return {
        ...api,
        setWidth: (width: number) => send({ type: 'size.set', value: { width } }),
        getPanelProps() {
            return {
                ...api.getRootProps(),
                'data-tag': 'sidebar',
                'data-position': prop('position'),
                style: { width: api.open ? prop('width') : 0 },
            };
        },
        getHeaderProps() {
            return {
                'data-tag': 'sidebar',
                'data-scope': 'collapsible',
                'data-part': 'header',
                'data-position': prop('position'),
            };
        },
        getMiniPanelProps() {
            return {
                'data-position': prop('position'),
                'data-disabled': prop('disabled'),
                'data-tag': 'sidebar',
                'data-scope': 'collapsible',
                'data-part': 'mini-panel',
                onClick: () => api.setOpen(true),
            };
        },
        getCloseTriggerProps() {
            return {
                'data-position': prop('position'),
                'data-tag': 'sidebar',
                'data-scope': 'collapsible',
                'data-part': 'close-trigger',
                onClick: () => api.setOpen(false),
            };
        },
        getTriggerProps() {
            return {
                'data-position': prop('position'),
                'data-tag': 'sidebar',
                'data-scope': 'collapsible',
                'data-part': 'trigger',
                onClick: () => api.setOpen(!api.open),
            };
        },
    };
}) satisfies ConnectZagApi<Schema, collapsible.Api>;

export type Machine = typeof machine;

export const {
    Api,
    useApi,
    RootProvider,
    splitProps,
    useProxySelector,
    useSelector,
    State,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'collapsible',
    machine,
    connect,
});

export const Root = RootProvider;

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
