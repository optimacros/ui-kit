import { ComponentProps, PropsWithChildren } from 'react';
import { tw } from '@optimacros-ui/utils';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as checkbox from '@zag-js/checkbox';

export const { RootProvider, useApi } = createReactApiStateContext({
    api: null as checkbox.Api,
    id: 'checkbox',
    machine: checkbox,
    initialState: { disabled: false },
    defaultContext: {},
});

const rootClassName = tw`
flex items-center max-w-fit h-checkbox mb-checkbox-field
relative whitespace-nowrap box-border font-preferred-font antialiased text-full

focus:ring-0 
after:box-border after:antialiased before:box-border before:antialiased
data-disabled:cursor-not-allowed data-disabled:opacity-60
`;
export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>> & { value: string };
export const Root = forward<RootProps, 'label'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {(api) => (
            <styled.label {...api.getRootProps()} ref={ref} className={rootClassName}>
                {children}
            </styled.label>
        )}
    </RootProvider>
));

const boxControlClassName = tw`
border-border-checkbox rounded-sm border-solid border-2 cursor-pointer inline-block
size-checkbox relative transition-background-color duration-checkbox-transition-duration
ease-animation-curve-default align-top box-border font-preferred-font antialiased

focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500
after:box-border after:antialiased after:animate-none
before:box-border before:antialiased

data-[state=checked]:bg-checkbox data-[state=checked]:border-checkbox
data-disabled:border-checkbox-disabled data-disabled:cursor-auto
`;
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
            className={boxControlClassName}
        >
            <input {...apiHiddenInputProps} />
        </styled.div>
    );
});

const checkedIconClassName = tw`
group-data-[state=unchecked]:hidden
`;
export const CheckedIcon = forward<{}, 'div'>((props, ref) => (
    <styled.div
        {...props}
        ref={ref}
        className={checkedIconClassName}
        data-scope="checkbox"
        data-part="checked-icon"
    />
));

const uncheckedIconClassName = tw`
group-data-[state=checked]:hidden
`;
export const UncheckedIcon = forward<{}, 'div'>((props, ref) => (
    <styled.div
        {...props}
        ref={ref}
        className={uncheckedIconClassName}
        data-scope="checkbox"
        data-part="unchecked-icon"
    />
));

const customControlClassName = tw`
group relative cursor-pointer text-custom

hover:text-custom-hover
`;
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
            className={customControlClassName}
        >
            <input {...apiHiddenInputProps} />
            {children}
        </styled.div>
    );
});

const labelClassName = tw`
flex-1 pl-4 text-ellipsis cursor-pointer
color-checkbox-text inline-block leading-checkbox
align-top whitespace-nowrap text-checkbox-text pl-unit

data-disabled:text-checkbox-disabled data-disabled:cursor-auto
`;
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
            className={labelClassName}
        />
    );
});
