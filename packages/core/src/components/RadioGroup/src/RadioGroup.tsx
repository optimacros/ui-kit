import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as radio from '@zag-js/radio-group';
import { tw } from '@optimacros-ui/utils';
import { ComponentProps, PropsWithChildren } from 'react';

export const { RootProvider, useApi, State } = createReactApiStateContext({
    api: null as radio.Api,
    id: 'radio',
    machine: radio,
    initialState: { disabled: false },
    defaultContext: {},
});

export const rootClassName = 'block';
export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {(api) => (
            <styled.div {...api.getRootProps()} className={rootClassName} ref={ref}>
                {children}
            </styled.div>
        )}
    </RootProvider>
));

const itemClassName = tw`
flex w-fit h-radio-button mb-[var(--margin-bottom-radio)] relative
whitespace-nowrap cursor-pointer

data-disabled:cursor-auto

data-disabled:before:hidden
`;
export const Item = forward<{ value: string }, 'label'>(({ value, ...rest }, ref) => {
    const api = useApi();

    const apiItemProps = api.getItemProps({ value });

    return (
        <styled.label
            {...rest}
            ref={ref}
            {...apiItemProps}
            data-scope="radio-group"
            data-part="item"
            key={`item-${value}`}
            className={itemClassName}
        />
    );
});

const controlClassName = tw`
border-2 border-solid border-radio rounded-full
inline-block size-radio-button relative align-top box-border font-preferred antialiased text-full

data-[state=checked]:border-radio-inner data-[state=checked]:radio
data-disabled:border-radio-disabled
`;
export const Control = forward<{ value: string }, 'div'>(({ value, ...rest }, ref) => {
    const api = useApi();

    const apiItemControlProps = api.getItemControlProps({ value });
    const apiHiddenInputProps = api.getItemHiddenInputProps({ value });

    return (
        <styled.div
            {...rest}
            ref={ref}
            {...apiItemControlProps}
            data-scope="radio-group"
            data-part="control"
            className={controlClassName}
        >
            <input {...apiHiddenInputProps} />
        </styled.div>
    );
});

const textClassName = tw`
text-radio-text text-radio-text inline-block leading-radio-button
pl-4 align-top whitespace-nowrap

data-disabled:text-radio-disabled
`;
export const Text = forward<{ value: string }, 'span'>(({ value, ...rest }, ref) => {
    const api = useApi();

    const apiItemTextProps = api.getItemTextProps({ value });

    return (
        <styled.span
            {...rest}
            ref={ref}
            {...apiItemTextProps}
            data-scope="radio-group"
            data-part="text"
            className={textClassName}
        />
    );
});
