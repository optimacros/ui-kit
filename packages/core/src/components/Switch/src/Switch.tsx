import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as zagSwitch from '@zag-js/switch';
import { ComponentProps, PropsWithChildren } from 'react';

export const { RootProvider, useApi } = createReactApiStateContext({
    id: 'switch',
    machine: zagSwitch,
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {(api) => (
            <styled.label {...api.getRootProps()} ref={ref}>
                {children}
                <styled.input {...api.getHiddenInputProps()} />
            </styled.label>
        )}
    </RootProvider>
));

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