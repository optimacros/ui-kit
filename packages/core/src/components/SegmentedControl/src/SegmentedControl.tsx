import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as radio from '@zag-js/radio-group';
import { ComponentProps, PropsWithChildren } from 'react';

export const { RootProvider, useApi } = createReactApiStateContext({
    id: 'radio',
    machine: radio,
    connect(api, { state, send }, machine) {
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
                };
            },
            getItemProps(props) {
                return {
                    ...api.getItemProps(props),
                    'data-scope': 'segmented-control',
                };
            },
        };
    },
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {(api) => (
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
