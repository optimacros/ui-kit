import { ComponentProps, useMemo } from 'react';
import { BaseRoot, RootProvider } from '../Loader';
import { isNumber } from '@optimacros/ui-kit-utils';
import { RootContent } from './RootContent';
import { forward } from '@optimacros/ui-kit-store';

export interface Props {
    max?: number;
    min?: number;
    value?: number | null;
    disabled?: boolean;
    /** not implemented yet */
    buffer?: number;
    /** @deprecated
     * use value=null for indeterminate mode
     * */
    mode?: 'determinate' | 'indeterminate';
    multicolor?: boolean;
}

type CompositeProps = ComponentProps<typeof BaseRoot> & Props;

export const Root = forward<CompositeProps, 'div'>(
    ({ children, value: valueProp, disabled, multicolor, mode, ...context }, ref) => {
        const value = useMemo(() => {
            if (mode === 'indeterminate') {
                return null;
            }

            if (isNumber(valueProp)) {
                return valueProp;
            }

            return null;
        }, [valueProp, mode]);

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
    { memoize: true, displayName: 'Root' },
);
