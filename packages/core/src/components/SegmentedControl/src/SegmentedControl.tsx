import {
    ConnectMachine,
    createMachineContext,
    forward,
    styled,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import * as machine from '@zag-js/radio-group';
import { ComponentProps, PropsWithChildren } from 'react';

type State = UserState<typeof machine>;
type Context = UserContext<machine.Context, {}>;

const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        getRootProps() {
            return {
                ...api.getRootProps(),
                'data-scope': 'segmented-control',
            };
        },
        getItemControlProps(props) {
            return {
                ...api.getItemControlProps(props),
                'data-scope': 'segmented-control',
            };
        },
        getItemHiddenInputProps(props) {
            return {
                ...api.getItemHiddenInputProps(props),
                'data-scope': 'segmented-control',
                'data-part': 'hidden-input',
            };
        },
        getItemProps(props) {
            return {
                ...api.getItemProps(props),
                'data-scope': 'segmented-control',
            };
        },
    };
}) satisfies ConnectMachine<machine.Api, Context, State>;

export const { RootProvider, useApi, Api, splitProps, useProxySelector, useSelector } =
    createMachineContext({
        id: 'radio',
        machine,
        connect,
    });

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {({ api }) => (
            <styled.div {...api.getRootProps()} ref={ref}>
                {children}
            </styled.div>
        )}
    </RootProvider>
));

export const Item = forward<{ value: string }, 'label'>(({ value, children, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.label {...rest} {...api.getItemProps({ value })} ref={ref}>
            <span {...api.getItemTextProps({ value })}>{children}</span>
            <input {...api.getItemHiddenInputProps({ value })} />
        </styled.label>
    );
});
