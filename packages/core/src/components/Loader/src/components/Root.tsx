import { ComponentProps } from 'react';
import { RootProvider, useProxySelector } from './context';
import { forward, styled } from '@optimacros-ui/store';
import { isFunction } from '@optimacros-ui/utils';

export type Props = ComponentProps<typeof RootProvider>;

export const Root = forward<Props, 'div'>(
    ({ children, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {(api) => (
                    <styled.div ref={ref} {...api.getRootProps()}>
                        {isFunction(children) ? children(api) : children}
                    </styled.div>
                )}
            </RootProvider>
        );
    },
    { displayName: 'Loader.Root' },
);

export const StartTrigger = forward<{}, 'button'>((props, ref) => {
    const start = useProxySelector((state) => state.start);
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
