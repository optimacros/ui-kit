import { ComponentProps } from 'react';
import { RootProvider } from './context';
import { forward, styled } from '@optimacros-ui/store';

export type Props = ComponentProps<typeof RootProvider>;

export const Root = forward<Props, 'div'>(
    ({ children, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {(api) => (
                    <styled.div ref={ref} {...api.getRootProps()}>
                        {children}
                    </styled.div>
                )}
            </RootProvider>
        );
    },
    { displayName: 'Root' },
);
