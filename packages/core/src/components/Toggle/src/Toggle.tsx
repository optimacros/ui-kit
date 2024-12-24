import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as zagSwitch from '@zag-js/switch';
import { ComponentProps, PropsWithChildren } from 'react';

export const { RootProvider, useApi } = createReactApiStateContext({
    id: 'toggle',
    machine: zagSwitch,
    connect(api, { state, send }, machine) {
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
    },
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Toggle = forward<RootProps, 'label'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {(api) => (
            <styled.label {...api.getRootProps()} ref={ref}>
                <styled.div {...api.getControlProps()}>{children}</styled.div>
                <styled.input {...api.getHiddenInputProps()} />
            </styled.label>
        )}
    </RootProvider>
));
