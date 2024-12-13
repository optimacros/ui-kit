import * as collapsible from '@zag-js/collapsible';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';
import { PropsWithChildren, ComponentProps, CSSProperties, FC } from 'react';

type InitialState = {
    open?: boolean;
    width?: CSSProperties['width'];
    position?: 'left' | 'right';
};

const initialState: InitialState = {
    position: 'right',
};

export const { Api, useApi, RootProvider } = createReactApiStateContext({
    id: 'collapsible',
    initialState,
    api: null as collapsible.Api,
    machine: collapsible,
    useExtendApi: (state, api) => ({ ...api, ...state }),
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>> & {
    open?: boolean;
    width?: CSSProperties['width'];
    position?: 'left' | 'right';
};

export const Root: FC<RootProps> = ({ children, width = 300, position = 'right', ...context }) => {
    return (
        <RootProvider {...context} state={{ position, width }}>
            {(api) => (isFunction(children) ? children(api) : children)}
        </RootProvider>
    );
};

export const Panel = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                {...api.getRootProps()}
                ref={ref}
                data-tag="sidebar"
                data-position={api.position}
                style={{ width: api.open ? api.width : 0 }}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'Panel' },
);

export const Header = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...props}
                ref={ref}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="header"
                data-position={api.position}
            />
        );
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

        return (
            <styled.div
                {...props}
                ref={ref}
                data-position={api.position}
                data-disabled={api.disabled}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="mini-panel"
                onClick={() => api.setOpen(true)}
            />
        );
    },
    { displayName: 'MiniPanel' },
);

export const CloseTrigger = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="close-trigger"
                data-position={api.position}
                ref={ref}
                onClick={() => api.setOpen(false)}
            >
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
            <styled.div
                {...rest}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="trigger"
                data-position={api.position}
                ref={ref}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'Trigger' },
);
