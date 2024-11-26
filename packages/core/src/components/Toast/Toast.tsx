import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as toast from '@zag-js/toast';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { tw } from '@optimacros/ui-kit-utils';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    api: null as toast.Api,
    id: 'toast',
    machine: toast,
    initialState: null,
    actor: true,
});

export const rootClassName = tw`flex rounded-sm flex items-center justify-center py-2 px-3 bg-[var(--bg)] text-[var(--text)] gap-2 w-sm`;

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => {
    return (
        <RootProvider {...context}>
            {(api) => (
                <styled.div {...api.getRootProps()} className={rootClassName} ref={ref}>
                    {children}
                </styled.div>
            )}
        </RootProvider>
    );
});

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }) => {
    const api = useApi();

    const apiProps = api.getActionTriggerProps();

    return (
        <styled.button {...apiProps} {...rest}>
            {children}
        </styled.button>
    );
});

export const closeTriggerClassName = 'bg-[var(--bg)] shrink-0';
export const CloseTrigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }) => {
    const api = useApi();

    const apiProps = { ...api.getCloseTriggerProps(), className: closeTriggerClassName };

    return (
        <styled.button {...apiProps} {...rest} data-toast-part={apiProps['data-part']}>
            {children}
        </styled.button>
    );
});

export const titleClassName = 'text-base';
export const Title = forward<{}, 'h3'>((props, ref) => {
    const api = useApi();

    return (
        <styled.h3 {...props} {...api.getTitleProps()} ref={ref} className={titleClassName}>
            {api.title}
        </styled.h3>
    );
});

export const descriptionClassName = 'text-sm';
export const Description = forward<{}, 'p'>((props, ref) => {
    const api = useApi();

    return (
        <styled.p
            {...api.getDescriptionProps()}
            {...props}
            ref={ref}
            className={descriptionClassName}
        >
            {api.description}
        </styled.p>
    );
});

export const contentClassName = 'flex flex-col gap-0.5';
export const Content = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div
            {...props}
            data-scope="toast"
            data-part="content"
            ref={ref}
            className={contentClassName}
        />
    );
});

export const LoaderBar = forward<{}, 'h3'>((props, ref) => {
    return <>todo</>;
});
