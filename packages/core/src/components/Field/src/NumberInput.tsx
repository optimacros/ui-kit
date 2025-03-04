import { createMachineContext, forward, styled, Zag } from '@optimacros-ui/store';
import * as machine from '@zag-js/number-input';
import { PropsWithChildren } from 'react';
import './number-input.css';
import * as $ from '@optimacros-ui/types';

type Schema = $.Merge<Zag.ModuleSchema<typeof machine>, {}>;

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
    State,
} = createMachineContext<Zag.Schema, machine.Api>({
    id: 'number-input',
    machine,
});

export type Props = Schema['props'];

export const Root = forward<PropsWithChildren<Props>, 'div'>(({ children, ...context }, ref) => {
    return (
        <RootProvider {...context}>
            {({ api }) => (
                <styled.div {...api.getRootProps()} ref={ref}>
                    {children}
                </styled.div>
            )}
        </RootProvider>
    );
});

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
