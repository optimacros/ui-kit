import { forward, styled } from '@optimacros-ui/store';
import * as toast from '@zag-js/toast';
import { ComponentProps, Fragment, PropsWithChildren, ReactNode } from 'react';
export type ToastOptions = toast.Options<any>;
import { RootProvider, ToastContext, useState } from './state';
import { Portal } from '@zag-js/react';

export type RootProps = PropsWithChildren<ComponentProps<typeof ToastContext.RootProvider>> & {
    index: number;
};

export const Root = forward<RootProps, 'div'>(
    ({ children, className, parent, style, ...context }, ref) => {
        return (
            <ToastContext.RootProvider {...context} parent={parent}>
                {({ api }) => (
                    <styled.div
                        className={className}
                        {...api.getRootProps()}
                        ref={ref}
                        data-testid={context['data-testid']}
                    >
                        <styled.span {...api.getGhostBeforeProps()} />
                        {children}
                        <styled.span {...api.getGhostAfterProps()} />
                    </styled.div>
                )}
            </ToastContext.RootProvider>
        );
    },
);

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }, ref) => {
    const api = ToastContext.useApi();

    const apiProps = api.getActionTriggerProps();

    return (
        <styled.button {...apiProps} {...rest} ref={ref}>
            {children}
        </styled.button>
    );
});

export const CloseTrigger = forward<{ children: ReactNode }, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = ToastContext.useApi();

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
    const api = ToastContext.useApi();

    return (
        <styled.h3 {...props} {...api.getTitleProps()} ref={ref}>
            {api.title as string}
        </styled.h3>
    );
});

export const Description = forward<{}, 'p'>((props, ref) => {
    const api = ToastContext.useApi();

    return (
        <styled.p {...api.getDescriptionProps()} {...props} ref={ref}>
            {api.description as string}
        </styled.p>
    );
});

export const Content = forward<{}, 'div'>((props, ref) => {
    return <styled.div {...props} data-scope="toast" data-part="content" ref={ref} />;
});

export const LoaderBar = forward<{}, 'h3'>((props, ref) => {
    return <>todo</>;
});

export const GroupProvider = ({
    children,
    store,
    ...rest
}: ComponentProps<typeof RootProvider>) => {
    return (
        <RootProvider store={store} {...rest}>
            {children}
        </RootProvider>
    );
};

export const Group = forward<
    {
        children: (props: {
            toast: toast.Props;
            parent: toast.GroupService;
            index: number;
        }) => ReactNode;
    },
    'div'
>(({ children, ...rest }, ref) => {
    const { api, service } = useState();

    return (
        <Portal>
            <styled.div {...api.getGroupProps()} {...rest} ref={ref}>
                {api.getToasts().map((toast, index) => (
                    <Fragment key={toast.id}>
                        {children({ toast, parent: service, index })}
                    </Fragment>
                ))}
            </styled.div>
        </Portal>
    );
});
