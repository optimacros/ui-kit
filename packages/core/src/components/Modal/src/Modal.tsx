import { forward, styled } from '@optimacros-ui/store';
import * as dialog from '@zag-js/dialog';
import { createReactApiStateContext } from '@optimacros-ui/store';
import { extendMachine } from '@optimacros-ui/store';
import { ComponentProps } from 'react';
import React from 'react';
import { Portal } from '@zag-js/react';

export const machine = extendMachine(
    dialog,
    {
        context: {
            onClose: () => {},
        },
        on: {
            'ON_CLOSE.SET': { actions: 'setOnClose' },
        },
    },
    ({ options }) => ({
        actions: {
            toggleVisibility(ctx, evt, params) {
                !ctx.open && ctx.onClose();

                options.actions.toggleVisibility(ctx, evt, params);
            },
        },
    }),
);

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    id: 'modal',
    machine,
    connect(api, { state, send }, machine) {
        function close() {
            api.setOpen(false);
        }

        return {
            ...api,
            close,
            getCloseTriggerProps() {
                return {
                    'data-scope': 'dialog',
                    'data-part': 'close-trigger',
                    onClick: close,
                };
            },
        };
    },
});

export const Root = forward<ComponentProps<typeof RootProvider>, { children }>(
    ({ children, ...rest }, ref) => {
        return (
            <RootProvider {...rest}>
                {(api) =>
                    api.open && (
                        <Portal>
                            <styled.div {...api.getBackdropProps()} />
                            <styled.div {...api.getPositionerProps()}>
                                <styled.div {...api.getContentProps()} ref={ref}>
                                    {children}
                                </styled.div>
                            </styled.div>
                        </Portal>
                    )
                }
            </RootProvider>
        );
    },
    {
        displayName: 'ModalRoot',
    },
);

export const Footer = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div {...rest} ref={ref} data-part="footer" data-scope="dialog">
            {children}
        </styled.div>
    ),
    {
        displayName: 'Footer',
    },
);

export const Header = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.div {...rest} ref={ref} data-scope="dialog" data-part="header">
                {children}
            </styled.div>
        );
    },
    {
        displayName: 'Header',
    },
);

export const CloseTrigger = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div ref={ref} {...rest} {...api.getCloseTriggerProps()}>
                {children}
            </styled.div>
        );
    },
    {
        displayName: 'CloseTrigger',
    },
);

export const ScrollContainer = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div ref={ref} {...rest} data-scope="dialog" data-part="scroll-container-outer">
            <styled.div
                data-scope="dialog"
                data-part="scroll-container-inner"
                data-role="scroll-container"
            >
                {children}
            </styled.div>
        </styled.div>
    ),
    {
        displayName: 'ScrollContainer',
    },
);

export const Title = forward<React.PropsWithChildren, 'h3'>(
    (props, ref) => {
        const api = useApi();

        return <styled.h3 {...api.getTitleProps()} ref={ref} {...props} />;
    },
    {
        displayName: 'Title',
    },
);
