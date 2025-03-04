import { PropsWithChildren } from 'react';
import { createMachineContext, forward, styled, Zag } from '@optimacros-ui/store';
import * as machine from '@zag-js/checkbox';

export type Schema = Zag.ModuleSchema<typeof machine>;

export const {
    RootProvider,
    useApi,
    splitProps,
    Api,
    select,
    slice,
    useFeatureFlags,
    useProxySelector,
    useSelector,
    useState,
} = createMachineContext<Schema, machine.Api>({
    id: 'checkbox',
    machine,
});

export type RootProps = PropsWithChildren<Partial<Schema['props']>>;

export const Root = forward<RootProps, 'label'>(
    function ({ children, ...rest }, ref) {
        const [context, props] = splitProps(rest);

        return (
            <RootProvider {...context}>
                {({ api }) => (
                    <styled.label
                        {...props}
                        {...api.getRootProps()}
                        data-scope="checkbox"
                        data-part="root"
                        ref={ref}
                    >
                        {children}
                    </styled.label>
                )}
            </RootProvider>
        );
    },
    {
        displayName: 'Checkbox.Root',
    },
);

export const BoxControl = forward<{}, 'input'>((props, ref) => {
    const api = useApi();
    const apiHiddenInputProps = api.getHiddenInputProps();
    const apiControlProps = api.getControlProps();

    return (
        <styled.div {...props} {...apiControlProps} data-scope="checkbox" data-part="box-control">
            <input
                ref={ref}
                data-testid="hidden-input"
                data-scope="checkbox"
                data-part="hidden-input"
                {...apiHiddenInputProps}
                role="checkbox"
            />
        </styled.div>
    );
});

export const CheckedIcon = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="checkbox" data-part="checked-icon" />
));

export const UncheckedIcon = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="checkbox" data-part="unchecked-icon" />
));

export const CustomControl = forward<{}, 'input'>(({ children, ...rest }, ref) => {
    const api = useApi();
    const apiHiddenInputProps = api.getHiddenInputProps();
    const apiControlProps = api.getControlProps();

    return (
        <styled.div {...rest} {...apiControlProps} data-scope="checkbox" data-part="custom-control">
            <input {...apiHiddenInputProps} ref={ref} />
            {children}
        </styled.div>
    );
});

export const Label = forward<{}, 'span'>((props, ref) => {
    const api = useApi();

    const apiLabelProps = api.getLabelProps();

    return (
        <styled.span
            {...apiLabelProps}
            {...props}
            ref={ref}
            data-scope="checkbox"
            data-part="label"
        />
    );
});
