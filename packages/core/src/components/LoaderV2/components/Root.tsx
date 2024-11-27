import { ComponentProps } from 'react';
import { RootProvider } from './Context';
import { RootContent } from './RootContent';
import { forward } from '@optimacros/ui-kit-store';

export interface Props {
    max?: number;
    min?: number;
    /** value=null for indeterminate mode */
    value?: number | null;
    disabled?: boolean;
    /** not implemented yet */
    buffer?: number;
    multicolor?: boolean;
}

type CompositeProps = ComponentProps<typeof RootProvider> & Props;

export const Root = forward<CompositeProps, 'div'>(
    ({ children, value = null, disabled, multicolor, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                <RootContent
                    value={value}
                    data-disabled={disabled}
                    data-multicolor={multicolor}
                    ref={ref}
                >
                    {children}
                </RootContent>
            </RootProvider>
        );
    },
    { displayName: 'Root' },
);
