import { ComponentProps } from 'react';
import { RootProvider, useApi } from './context';
import { forward, styled } from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';

export type Props = Omit<ComponentProps<typeof RootProvider>, 'children'>;

export const Root = forward<Props, 'div'>(
    ({ children, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {(ctx) => (
                    <styled.div
                        ref={ref}
                        {...ctx.api.getRootProps()}
                        data-testid={context['data-testid']}
                    >
                        {isFunction(children) ? children(ctx) : children}
                    </styled.div>
                )}
            </RootProvider>
        );
    },
    { displayName: 'Loader.Root' },
);

export const StartTrigger = forward<{}, 'button'>((props, ref) => {
    const { start } = useApi();

    return (
        <styled.button
            {...props}
            data-scope="progress"
            data-part="start-trigger"
            ref={ref}
            onClick={start}
        />
    );
});
