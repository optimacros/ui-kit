import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as toast from '@zag-js/toast';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    api: null as toast.Api,
    id: 'toast',
    machine: toast,
    initialState: {},
    actor: true,
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => {
    return (
        <RootProvider {...context}>
            {(api) => (
                <styled.div {...api.getRootProps()} ref={ref}>
                    <styled.span {...api.getGhostBeforeProps()} />
                    {children}
                    <styled.span {...api.getGhostAfterProps()} />
                </styled.div>
            )}
        </RootProvider>
    );
});

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }, ref) => {
    const api = useApi();

    const apiProps = api.getActionTriggerProps();

    return (
        <styled.button {...apiProps} {...rest} ref={ref}>
            {children}
        </styled.button>
    );
});

export const CloseTrigger = forward<{ children: ReactNode }, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        const apiProps = api.getCloseTriggerProps();

        return (
            <styled.button
                {...apiProps}
                {...rest}
                ref={ref}
                data-toast-part={apiProps['data-part']}
            >
                {children}
            </styled.button>
        );
    },
);

export const Title = forward<{}, 'h3'>((props, ref) => {
    const api = useApi();

    return (
        <styled.h3 {...props} {...api.getTitleProps()} ref={ref}>
            {api.title}
        </styled.h3>
    );
});

export const Description = forward<{}, 'p'>((props, ref) => {
    const api = useApi();

    return (
        <styled.p {...api.getDescriptionProps()} {...props} ref={ref}>
            {api.description}
        </styled.p>
    );
});

export const Content = forward<{}, 'div'>((props, ref) => {
    return <styled.div {...props} data-scope="toast" data-part="content" ref={ref} />;
});

export const LoaderBar = forward<{}, 'h3'>((props, ref) => {
    return <>todo</>;
});
