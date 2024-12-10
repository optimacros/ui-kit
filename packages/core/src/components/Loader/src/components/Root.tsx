import { ComponentProps } from 'react';
import { RootProvider } from './context';
import { RootContent } from './RootContent';
import { forward } from '@optimacros-ui/store';

export type Props = ComponentProps<typeof RootProvider> & {
    max?: number;
    min?: number;
    /** value=null for indeterminate mode */
    value?: number | null;
    disabled?: boolean;
    /** not implemented yet */
    buffer?: number;
    multicolor?: boolean;
};

export const Root = forward<Props, 'div'>(
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
