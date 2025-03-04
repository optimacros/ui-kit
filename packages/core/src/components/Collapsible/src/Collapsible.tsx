import { Zag, createMachineContext, forward, styled } from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';

import { ComponentProps } from 'react';
import * as machine from '@zag-js/collapsible';

type Schema = Zag.ModuleSchema<typeof machine>;

const connect = ((api, service) => {
    return {
        ...api,
        getIndicatorProps() {
            return {
                'data-scope': 'collapsible',
                'data-part': 'indicator',
                'data-state': service.prop('open') ? 'open' : 'closed',
            };
        },
    };
}) satisfies Zag.ConnectApi<Schema, machine.Api>;

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
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'collapsible',
    machine,
    connect,
});

export const Root = forward<ComponentProps<typeof RootProvider>, 'div'>(
    ({ children, as, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {(ctx) => (
                    <styled.div {...ctx.api.getRootProps()} ref={ref} as={as}>
                        {isFunction(children) ? children(ctx) : children}
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
