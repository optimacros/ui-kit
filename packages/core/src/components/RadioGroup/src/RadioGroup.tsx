import { createMachineContext, forward, styled, Zag } from '@optimacros-ui/store';
import * as radio from '@zag-js/radio-group';
import { ComponentProps, PropsWithChildren } from 'react';

export type Schema = Zag.ModuleSchema<typeof radio>;

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
} = createMachineContext<Schema, radio.Api>({
    id: 'radio',
    machine: radio,
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {({ api }) => (
            <styled.div {...api.getRootProps()} data-scope="radio-group" data-part="root" ref={ref}>
                {children}
            </styled.div>
        )}
    </RootProvider>
));

export const Item = forward<{ value: string; disabled?: boolean }, 'label'>(
    ({ value, disabled, ...rest }, ref) => {
        const api = useApi();
        const apiItemProps = api.getItemProps({ value, disabled });

        return (
            <styled.label
                {...rest}
                {...apiItemProps}
                data-scope="radio-group"
                data-part="item"
                ref={ref}
                key={`item-${value}`}
            />
        );
    },
);

export const Control = forward<{ value: string }, 'input'>(({ value, disabled, ...rest }, ref) => {
    const api = useApi();
    const apiItemControlProps = api.getItemControlProps({ value, disabled });
    const apiHiddenInputProps = api.getItemHiddenInputProps({ value, disabled });

    return (
        <styled.div {...rest} {...apiItemControlProps} data-scope="radio-group" data-part="control">
            <input {...apiHiddenInputProps} ref={ref} />
        </styled.div>
    );
});

export const Text = forward<{ value: string; disabled?: boolean }, 'span'>(
    ({ value, disabled, ...rest }, ref) => {
        const api = useApi();
        const apiItemTextProps = api.getItemTextProps({ value, disabled });

        return (
            <styled.span
                {...rest}
                {...apiItemTextProps}
                data-scope="radio-group"
                data-part="text"
                ref={ref}
            />
        );
    },
);

export type { ValueChangeDetails } from '@zag-js/radio-group';
