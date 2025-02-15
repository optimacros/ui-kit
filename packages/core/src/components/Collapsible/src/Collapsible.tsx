import {
    ConnectMachine,
    createReactApiStateContext,
    forward,
    styled,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';

import { ComponentProps } from 'react';
import * as machine from '@zag-js/collapsible';

export type State = UserState<typeof machine>;

export type Context = UserContext<machine.Context, {}>;

const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        getIndicatorProps() {
            return {
                'data-scope': 'collapsible',
                'data-part': 'indicator',
                'data-state': state.context.open ? 'open' : 'closed',
            };
        },
    };
}) satisfies ConnectMachine<machine.Api, Context, State>;

export const { Api, useApi, RootProvider, useSelector, useProxySelector } =
    createReactApiStateContext({
        id: 'collapsible',
        machine,
        connect,
    });

export const Root = forward<ComponentProps<typeof RootProvider>, 'div'>(
    ({ children, as, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {(api) => (
                    <styled.div {...api.getRootProps()} ref={ref} as={as}>
                        {isFunction(children) ? children(api) : children}
                    </styled.div>
                )}
            </RootProvider>
        );
    },
);
Root.displayName = 'Collapsible.Root';

export const Trigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getTriggerProps()} ref={ref} />;
});
Trigger.displayName = 'Collapsible.Trigger';

export const Content = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getContentProps()} ref={ref} />;
});
Content.displayName = 'Collapsible.Content';

export const Indicator = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getIndicatorProps()} ref={ref} />;
});
Indicator.displayName = 'Collapsible.Indicator';
