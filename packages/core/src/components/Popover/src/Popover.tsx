import { ReactNode } from 'react';
import { Portal } from '@zag-js/react';
import * as popover from '@zag-js/popover';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';

export const {
    useApi,
    State,
    Api,
    RootProvider: Root,
} = createReactApiStateContext({
    id: 'popover',
    initialState: {},
    machine: popover,
    api: null as popover.Api,
});

export const Trigger = forward<{ children: ReactNode }, 'button'>((props) => {
    const api = useApi();

    return (
        <styled.button
            data-scope="popover"
            data-part="trigger"
            {...api.getTriggerProps()}
            {...props}
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

export const CloseTrigger = forward<{}, 'div'>((props, ref) => {
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
