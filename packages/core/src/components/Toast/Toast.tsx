import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as toast from '@zag-js/toast';
import { ReactNode } from 'react';
import { isFunction, tw } from '@optimacros/ui-kit-utils';

export const { Api, Provider, Root, useApi } = createReactApiStateContext({
    api: null as toast.Api,
    id: 'toast',
    machine: toast,
    initialState: null,
    actor: true,
    rootAsTag: true,
    useRootProps(api) {
        return {
            ...api.getRootProps(),
            className: tw`bg-black size-3xl`,
        };
    },
});

export const Trigger = forward<{ children: ((props) => ReactNode) | ReactNode }, 'button'>(
    ({ children, ...rest }) => {
        const api = useApi();

        const apiProps = api.getActionTriggerProps();

        return isFunction(children) ? (
            children(apiProps)
        ) : (
            <styled.button {...apiProps} {...rest}>
                {children}
            </styled.button>
        );
    },
);

export const CloseTrigger = forward<{ children: ((props) => ReactNode) | ReactNode }, 'button'>(
    ({ children, ...rest }) => {
        const api = useApi();

        const apiProps = api.getCloseTriggerProps();

        return isFunction(children) ? (
            children(apiProps)
        ) : (
            <styled.button {...apiProps} {...rest}>
                {children}
            </styled.button>
        );
    },
);

export const Title = forward<{}, 'h3'>((props, ref) => {
    const api = useApi();

    return <styled.h3 {...api.getTitleProps()} {...props} ref={ref} />;
});

export const Description = forward<{}, 'p'>((props, ref) => {
    const api = useApi();

    return <styled.p {...api.getDescriptionProps()} {...props} ref={ref} />;
});
