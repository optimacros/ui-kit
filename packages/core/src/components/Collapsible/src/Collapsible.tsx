import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { ComponentProps } from 'react';
import * as machine from '@zag-js/collapsible';

export const { Api, useApi, RootProvider, useSelector, useProxySelector } =
    createReactApiStateContext({
        id: 'collapsible',
        machine,
        connect(api, { state, send }, machine) {
            return {
                ...api,
                getIndicatorProps() {
                    return {
                        'data-scope': 'collapsible',
                        'data-part': 'indicator',
                        'data-open': state.context.open,
                        open: state.context.open,
                    };
                },
            };
        },
    });

export const Root = forward<ComponentProps<typeof RootProvider>, 'div'>(
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

export const Trigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getTriggerProps()} ref={ref} />;
});

export const Content = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getContentProps()} ref={ref} />;
});

export const Indicator = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getIndicatorProps()} ref={ref} />;
});
