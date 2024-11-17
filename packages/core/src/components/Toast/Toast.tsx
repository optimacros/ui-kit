import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as toast from '@zag-js/toast';
import { ReactNode } from 'react';
import { isFunction, tw } from '@optimacros/ui-kit-utils';

export const rootClassName = tw`flex rounded-sm flex items-center justify-center py-2 px-3 bg-[var(--bg)] text-[var(--text)] gap-2 w-sm`;

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
            className: rootClassName,
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

export const closeTriggerClassName = 'bg-[var(--bg)] shrink-0';
export const CloseTrigger = forward<{ children: ((props) => ReactNode) | ReactNode }, 'button'>(
    ({ children, ...rest }) => {
        const api = useApi();

        const apiProps = { ...api.getCloseTriggerProps(), className: closeTriggerClassName };

        return isFunction(children) ? (
            children(apiProps)
        ) : (
            <styled.button {...apiProps} {...rest}>
                {children}
            </styled.button>
        );
    },
);

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
