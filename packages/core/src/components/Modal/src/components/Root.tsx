import { forward, styled } from '@optimacros-ui/store';
import { RootProvider } from './context';
import React, { useMemo } from 'react';
import { Context } from '@zag-js/dialog';
import { Portal } from '@zag-js/react';

interface Props extends React.PropsWithChildren, Partial<Context> {
    onRequestClose?: () => void;
}

export const Root = forward<Props, 'div'>(
    ({ children, open, onRequestClose, onOpenChange, ...rest }, ref) => {
        const callbacks = useMemo(() => {
            const cbs = {
                onOpenChange: onOpenChange,
            };

            if (onRequestClose) {
                cbs.onOpenChange = (details) => {
                    if (!details.open) {
                        onRequestClose();
                    }
                };
            }

            return cbs;
        }, [onRequestClose, onOpenChange]);

        if (!open) {
            return null;
        }

        return (
            <RootProvider {...callbacks} open={open} {...rest}>
                {(api) => (
                    <Portal>
                        <styled.div {...api.getBackdropProps()} />
                        <styled.div {...api.getPositionerProps()}>
                            <styled.div {...api.getContentProps()} ref={ref}>
                                {children}
                            </styled.div>
                        </styled.div>
                    </Portal>
                )}
            </RootProvider>
        );
    },
    {
        displayName: 'ModalRoot',
    },
);
