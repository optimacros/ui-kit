import { createMachineContext, forward, styled, ZagSchema } from '@optimacros-ui/store';
import * as machine from '@zag-js/number-input';
import { ComponentProps, PropsWithChildren } from 'react';
import './number-input.css';

type Schema = ZagSchema<typeof machine>;

export const {
    Api,
    useApi,
    RootProvider,
    useSelector,
    useProxySelector,
    select,
    slice,
    splitProps,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, machine.Api>({
    id: 'number-input',
    machine,
});

export const Root = forward<ComponentProps<typeof RootProvider> & PropsWithChildren, 'div'>(
    ({ children, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {({ api }) => (
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
