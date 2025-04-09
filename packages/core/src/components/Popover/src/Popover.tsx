import { ReactNode } from 'react';
import { Portal } from '@zag-js/react';
import * as machine from '@zag-js/popover';
import { createMachineContext, forward, styled, Zag } from '@optimacros-ui/store';

export type Schema = Zag.ModuleSchema<typeof machine>;

export const {
    useApi,
    Api,
    RootProvider,
    splitProps,
    useProxySelector,
    useSelector,
    State,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, machine.Api>({
    id: 'popover',
    machine,
});

export const Root = RootProvider;

export const Trigger = forward<{ children: ReactNode }, 'button'>((props, ref) => {
    const api = useApi();

    return (
        <styled.button
            data-scope="popover"
            data-part="trigger"
            {...api.getTriggerProps()}
            {...props}
            ref={ref}
        />
    );
});

export const Positioner = forward<{ portalled?: boolean }, 'div'>(({ portalled, ...rest }, ref) => {
    const api = useApi();
    const content = <styled.div {...rest} {...api.getPositionerProps()} ref={ref} />;

    return portalled ? content : <Portal>{content}</Portal>;
});

export const Arrow = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <div data-scope="popover" data-part="arrow" {...props} {...api.getArrowProps()} ref={ref}>
            <div data-scope="popover" data-part="arrow-tip" {...api.getArrowTipProps()} />
        </div>
    );
});

export const Content = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div
            data-scope="popover"
            data-part="content"
            {...props}
            {...api.getContentProps()}
            ref={ref}
        />
    );
});

export const Title = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div
            data-scope="popover"
            data-part="title"
            {...props}
            {...api.getTitleProps()}
            ref={ref}
        />
    );
});

export const Description = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div
            data-scope="popover"
            data-part="description"
            {...props}
            {...api.getDescriptionProps()}
            ref={ref}
        />
    );
});

export const CloseTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return (
        <styled.button
            data-scope="popover"
            data-part="close-trigger"
            {...props}
            {...api.getCloseTriggerProps()}
            ref={ref}
        />
    );
});
