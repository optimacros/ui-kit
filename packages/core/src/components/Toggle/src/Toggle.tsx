import { Zag, createMachineContext, forward, styled } from '@optimacros-ui/store';
import * as machine from '@zag-js/checkbox';
import { ComponentProps, PropsWithChildren } from 'react';

export type Schema = Zag.ModuleSchema<typeof machine>;

const connect = ((api, service) => {
    return {
        ...api,
        getRootProps() {
            return {
                ...api.getRootProps(),
                'data-scope': 'toggle',
                onClick: undefined,
            };
        },
        getHiddenInputProps() {
            return {
                ...api.getHiddenInputProps(),
                'data-scope': 'toggle',
            };
        },
        getControlProps() {
            return {
                ...api.getControlProps(),
                // onClick: api.toggleChecked,
                'data-scope': 'toggle',
            };
        },
    };
}) satisfies Zag.ConnectApi<Schema, machine.Api>;

export const {
    RootProvider,
    useApi,
    Api,
    splitProps,
    useProxySelector,
    useSelector,
    State,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'toggle',
    machine,
    connect,
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Toggle = forward<RootProps, 'label'>(({ children, asChild, ...context }, ref) => (
    <RootProvider {...context}>
        {({ api }) => (
            <styled.label {...api.getRootProps()} ref={ref}>
                <styled.div {...api.getControlProps()}>{children}</styled.div>
                <styled.input {...api.getHiddenInputProps()} />
            </styled.label>
        )}
    </RootProvider>
));
