import type { PropsWithChildren } from 'react';
import * as editable from '@zag-js/editable';
import { tw } from '@optimacros/ui-kit-utils';
import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    id: 'editable',
    initialState: null,
    api: null as editable.Api,
    machine: editable,
});

export const footerClassName = tw`w-full min-h-5 flex flex-row items-center space-x-4 px-3 py-1 text-xs box-border

text-[var(--text)] bg-[var(--bg)]`;

export const Root = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <div {...rest} ref={ref} {...api.getRootProps()}>
                <div>{children}</div>
            </div>
        );
    },
    { displayName: 'Root' },
);

export const Area = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} ref={ref} {...api.getAreaProps()}>
                {children}
            </styled.div>
        );
    },
    { displayName: 'Area' },
);

export const Input = forward<PropsWithChildren, 'input'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.input {...rest} ref={ref} {...api.getInputProps()}>
                {children}
            </styled.input>
        );
    },
    { displayName: 'Input' },
);

export const TextArea = forward<PropsWithChildren, 'textarea'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.textarea {...rest} ref={ref} {...api.getInputProps()}>
                {children}
            </styled.textarea>
        );
    },
    { displayName: 'TextArea' },
);

export const Preview = forward<{}, 'span'>(
    (props, ref) => {
        const api = useApi();

        return <styled.span {...props} ref={ref} {...api.getPreviewProps()} />;
    },
    { displayName: 'Preview' },
);

export const EditTrigger = forward<PropsWithChildren, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.button {...rest} ref={ref} {...api.getEditTriggerProps()}>
                {children}
            </styled.button>
        );
    },
    { displayName: 'EditTrigger' },
);

export const SubmitTrigger = forward<PropsWithChildren, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.button {...rest} ref={ref} {...api.getSubmitTriggerProps()}>
                {children}
            </styled.button>
        );
    },
    { displayName: 'SubmitTrigger' },
);

export const CancelTrigger = forward<PropsWithChildren, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.button {...rest} ref={ref} {...api.getCancelTriggerProps()}>
                {children}
            </styled.button>
        );
    },
    { displayName: 'CancelTrigger' },
);
