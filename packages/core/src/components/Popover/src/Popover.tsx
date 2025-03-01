import { ReactNode } from 'react';
import { Portal } from '@zag-js/react';
import * as machine from '@zag-js/popover';
import { createMachineContext, forward, styled, ZagSchema } from '@optimacros-ui/store';

export type Schema = ZagSchema<typeof machine>;

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

export const Positioner = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <Portal>
            <styled.div
                data-scope="popover"
                data-part="positioner"
                {...props}
                {...api.getPositionerProps()}
                ref={ref}
            />
        </Portal>
    );
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
