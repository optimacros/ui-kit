import { createMachineContext, forward, styled } from '@optimacros-ui/store';
import * as machine from '@zag-js/switch';
import { ComponentProps, PropsWithChildren } from 'react';

export const { RootProvider, useApi, Api, splitProps, useProxySelector, useSelector } =
    createMachineContext<typeof machine, machine.Api>({
        id: 'switch',
        machine,
    });

export interface RootProps extends PropsWithChildren<ComponentProps<typeof RootProvider>> {
    /** @default md */
    size?: 'sm' | 'md' | 'lg';
    /** @default primary */
    color?: 'primary' | 'success' | 'danger';
}

export const Root = forward<RootProps, 'label'>(
    ({ children, size = 'md', color = 'primary', ...context }, ref) => (
        <RootProvider {...context}>
            {({ api }) => (
                <styled.label {...api.getRootProps()} ref={ref} data-size={size} data-color={color}>
                    {children}
                    <styled.input {...api.getHiddenInputProps()} />
                </styled.label>
            )}
        </RootProvider>
    ),
);

export const HiddenInput = forward<{}, 'input'>((props, ref) => {
    const api = useApi();

    return <styled.input {...props} {...api.getHiddenInputProps()} ref={ref} />;
});

export const Thumb = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getThumbProps()} ref={ref} />;
});

export const Control = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getControlProps()} ref={ref} />;
});

export const Label = forward<{}, 'span'>((props, ref) => {
    const api = useApi();

    return <styled.span {...props} {...api.getLabelProps()} ref={ref} />;
});
