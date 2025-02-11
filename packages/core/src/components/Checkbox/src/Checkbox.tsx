import { ComponentProps, PropsWithChildren } from 'react';
import {
    createReactApiStateContext,
    forward,
    styled,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import * as machine from '@zag-js/checkbox';

export type State = UserState<typeof machine>;

export type Context = UserContext<machine.Context, {}>;

export const { RootProvider, useApi, splitProps } = createReactApiStateContext<
    typeof machine,
    machine.Api,
    Context,
    State
>({
    id: 'checkbox',
    machine,
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;

export const Root = forward<RootProps, 'label'>(
    function ({ children, controllable, ...rest }, ref) {
        const [context, props] = splitProps(rest);

        return (
            <RootProvider {...context} controllable={controllable}>
                {(api) => (
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

export const BoxControl = forward<{}, 'div'>((props, ref) => {
    const api = useApi();
    const apiHiddenInputProps = api.getHiddenInputProps();
    const apiControlProps = api.getControlProps();

    return (
        <styled.div
            {...props}
            {...apiControlProps}
            ref={ref}
            data-scope="checkbox"
            data-part="box-control"
        >
            <input
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

export const CustomControl = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const api = useApi();
    const apiHiddenInputProps = api.getHiddenInputProps();
    const apiControlProps = api.getControlProps();

    return (
        <styled.div
            {...rest}
            {...apiControlProps}
            ref={ref}
            data-scope="checkbox"
            data-part="custom-control"
        >
            <input {...apiHiddenInputProps} />
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
