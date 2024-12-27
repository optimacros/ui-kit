import {
    ExtendedMachine,
    forward,
    MachineConfig,
    MachineOptions,
    styled,
} from '@optimacros-ui/store';
import * as dialog from '@zag-js/dialog';
import { createReactApiStateContext } from '@optimacros-ui/store';
import { extendMachine } from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';
import { ComponentProps } from 'react';
import React from 'react';
import { PropsWithChildren } from 'react';
import { Portal } from '@zag-js/react';

const config = {
    context: {
        onClose: () => {},
    },
    on: {
        'ON_CLOSE.SET': { actions: 'setOnClose' },
    },
} satisfies MachineConfig<dialog.Service>;

const options = ({ options }) =>
    ({
        actions: {
            toggleVisibility(ctx, evt, params) {
                !ctx.open && ctx.onClose();

                options.actions.toggleVisibility(ctx, evt, params);
            },
        },
    }) satisfies MachineOptions<dialog.Service, dialog.Context, typeof config>;

export const machine: ExtendedMachine<
    typeof dialog,
    dialog.Service,
    dialog.Context,
    typeof config
> = extendMachine(dialog, config, options);

export type Machine = typeof machine;

export const {
    Api,
    RootProvider: Root,
    useApi,
} = createReactApiStateContext({
    id: 'modal',
    machine,
});

/**
 * TODO
 * Get rid of it
 * @deprecated
 * */
export const CustomRoot = forward<ComponentProps<typeof Root>, 'div'>(
    ({ children, ...rest }, ref) => {
        return (
            <Root {...rest}>
                {(api) =>
                    api.open && (
                        <Portal>
                            <styled.div {...api.getBackdropProps()} />
                            <styled.div {...api.getPositionerProps()}>
                                <styled.div {...api.getContentProps()} ref={ref}>
                                    {isFunction(children) ? children(api) : children}
                                </styled.div>
                            </styled.div>
                        </Portal>
                    )
                }
            </Root>
        );
    },
    {
        displayName: 'ModalRoot',
    },
);

export const Trigger = forward<PropsWithChildren, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getTriggerProps()} ref={ref} />;
});

export const Content = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            api.open && (
                <Portal>
                    <styled.div {...api.getBackdropProps()} />
                    <styled.div {...api.getPositionerProps()}>
                        <styled.div {...props} {...api.getContentProps()} ref={ref} />
                    </styled.div>
                </Portal>
            )
        );
    },
    {
        displayName: 'Content',
    },
);

export const Footer = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div {...rest} ref={ref} data-part="footer" data-scope="dialog">
            {children}
        </styled.div>
    ),
    {
        displayName: 'Footer',
    },
);

export const Header = forward<PropsWithChildren, 'div'>(
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

export const CloseTrigger = forward<PropsWithChildren, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.button ref={ref} {...rest} {...api.getCloseTriggerProps()}>
                {children}
            </styled.button>
        );
    },
    {
        displayName: 'CloseTrigger',
    },
);

export const ScrollContainer = forward<PropsWithChildren, 'div'>(
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

export const Title = forward<PropsWithChildren, 'h3'>(
    (props, ref) => {
        const api = useApi();

        return <styled.h3 {...api.getTitleProps()} ref={ref} {...props} />;
    },
    {
        displayName: 'Title',
    },
);
