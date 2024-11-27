import { ComponentProps, useMemo } from 'react';
import { RootProvider } from './Context';
import { isNumber } from '@optimacros/ui-kit-utils';
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
    ({ children, value: valueProp, disabled, multicolor, ...context }, ref) => {
        const value = useMemo(() => {
            if (isNumber(valueProp)) {
                return valueProp;
            }

            return null;
        }, [valueProp]);

        return (
            <RootProvider {...context} value={value}>
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
