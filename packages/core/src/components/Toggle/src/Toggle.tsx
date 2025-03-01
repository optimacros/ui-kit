import {
    ConnectMachine,
    createMachineContext,
    forward,
    styled,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import * as machine from '@zag-js/switch';
import { ComponentProps, PropsWithChildren } from 'react';

export type State = UserState<typeof machine>;

export type Context = UserContext<machine.Context, {}>;

const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        getRootProps() {
            return {
                ...api.getRootProps(),
                'data-scope': 'toggle',
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
                onClick: api.toggleChecked,
                'data-scope': 'toggle',
            };
        },
    };
}) satisfies ConnectMachine<machine.Api, Context, State>;

export const { RootProvider, useApi, Api, splitProps, useProxySelector, useSelector } =
    createMachineContext({
        id: 'toggle',
        machine,
        connect,
    });

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Toggle = forward<RootProps, 'label'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {({ api }) => (
            <styled.label {...api.getRootProps()} ref={ref}>
                <styled.div {...api.getControlProps()}>{children}</styled.div>
                <styled.input {...api.getHiddenInputProps()} />
            </styled.label>
        )}
    </RootProvider>
));
