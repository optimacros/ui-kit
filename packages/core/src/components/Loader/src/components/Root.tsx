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
    onCancel?: () => void;
};

export const Root = forward<Props, 'div'>(
    ({ children, value = null, disabled, multicolor, onCancel, ...context }, ref) => {
        return (
            <RootProvider {...context} state={{ onCancel }}>
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
