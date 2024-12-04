import * as collapsible from '@zag-js/collapsible';
import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import { isFunction, tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren, ComponentProps, CSSProperties, FC } from 'react';

export const { Api, useApi, RootProvider } = createReactApiStateContext({
    id: 'collapsible',
    initialState: null,
    api: null as collapsible.Api,
    machine: collapsible,
    useExtendApi: (state, api) => ({ ...api, ...state }),
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>> & {
    open: boolean;
    width?: CSSProperties['width'];
    position?: 'left' | 'right';
};

export const Root: FC<RootProps> = ({
    children,
    open,
    width = 300,
    position = 'right',
    ...context
}) => {
    return (
        <RootProvider {...context} state={{ open, position, width }}>
            {(api) => (isFunction(children) ? children(api) : children)}
        </RootProvider>
    );
};

export const rootClassName = tw`bg-[var(--bg)] h-full absolute top-0 data-[position=right]:right-0 data-[position=left]:left-0 transition-all box-border overflow-hidden flex flex-col

border-0 data-[position=right]:border-l data-[position=left]:border-r border-solid border-[var(--border-bg)]`;

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
                className={rootClassName}
                style={{ width: api.open ? api.width : 0 }}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'Panel' },
);

export const headerClassName = tw`flex flex-row items-center
border-0 border-b border-solid border-[var(--border-bg)]

p-[var(--padding)]

data-[position=left]:flex-row-reverse`;

export const Header = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...props}
                ref={ref}
                className={headerClassName}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="header"
                data-position={api.position}
            />
        );
    },
    { displayName: 'Header' },
);

export const contentOuterClassName = tw`min-h-0 p-[var(--padding)]`;
export const contentInnerClassName = tw`scroll h-full`;

export const Content = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div
            {...rest}
            ref={ref}
            data-tag="sidebar"
            data-scope="collapsible"
            data-part="content-outer"
            className={contentOuterClassName}
        >
            <styled.div
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="content-inner"
                className={contentInnerClassName}
            >
                {children}
            </styled.div>
        </styled.div>
    ),
    { displayName: 'Content' },
);

export const miniPanelClassName = tw`bg-[var(--bg)] h-full absolute top-0 data-[position=right]:right-0 data-[position=left]:left-0 box-border w-[var(--width)] transition-all p-[var(--padding)]

border-0 data-[position=right]:border-l data-[position=left]:border-r border-solid border-[var(--border-bg)]

cursor-pointer hover:bg-[var(--bg-hover)]`;

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
                className={miniPanelClassName}
                data-position={api.position}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="mini-panel"
            />
        );
    },
    { displayName: 'MiniPanel' },
);

export const closeTriggerClassName = tw`text-[var(--text)] hover:text-[var(--text-hover)] size-[var(--size)] flex items-center justify-center cursor-pointer

data-[position=left]:rotate-180`;

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
                className={closeTriggerClassName}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'CloseTrigger' },
);

export const triggerClassName = tw`transition-all text-[var(--text)] hover:text-[var(--text-hover)] size-[var(--size)] flex items-center justify-center

data-[position=left]:rotate-180`;

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
                className={triggerClassName}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'Trigger' },
);
