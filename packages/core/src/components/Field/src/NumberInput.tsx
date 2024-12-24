import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as machine from '@zag-js/number-input';
import { ComponentProps } from 'react';
import './number-input.css';

export const { Api, useApi, RootProvider, useSelector, useProxySelector } =
    createReactApiStateContext({
        id: 'number-input',
        machine,
    });

export const Root = forward<ComponentProps<typeof RootProvider>, {}>(
    ({ children, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {(api) => (
                    <styled.div {...api.getRootProps()} ref={ref}>
                        {children}
                    </styled.div>
                )}
            </RootProvider>
        );
    },
);

export const Input = forward<{}, 'input'>((props, ref) => {
    const api = useApi();

    return <styled.input {...props} {...api.getInputProps()} ref={ref} />;
});

export const Decrement = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getDecrementTriggerProps()} ref={ref} />;
});

export const Increment = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getIncrementTriggerProps()} ref={ref} />;
});

export const Scrubber = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getScrubberProps()} ref={ref} />;
});
