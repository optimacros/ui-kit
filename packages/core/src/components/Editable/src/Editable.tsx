import type { PropsWithChildren } from 'react';
import * as editable from '@zag-js/editable';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { Flex } from '@optimacros-ui/flex';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    id: 'editable',
    machine: editable,
});

export const Root = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} ref={ref} {...api.getRootProps()}>
                <Flex direction="column" align="start">
                    {children}
                </Flex>
            </styled.div>
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

export const Label = forward<{}, 'label'>(
    (props, ref) => {
        const api = useApi();

        // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
        return <styled.label {...props} ref={ref} {...api.getLabelProps()} />;
    },
    { displayName: 'Label' },
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
