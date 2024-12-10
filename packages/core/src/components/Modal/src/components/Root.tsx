import { forward, styled } from '@optimacros-ui/store';
import { RootProvider } from './context';
import React, { useMemo } from 'react';
import { Context } from '@zag-js/dialog';
import { Portal } from '@zag-js/react';
import { tw } from '@optimacros-ui/utils';

export const backdropClassName = tw`fixed z-[var(--z)] inset-0 bg-[var(--bg)]`;
export const positionerClassName = tw`fixed z-[var(--z)] inset-0 flex items-center justify-center h-screen w-screen`;
export const contentClassName = tw`flex flex-col items-start rounded-[var(--border-radius)] bg-[var(--bg)]
border-1 border-solid border-divider max-w-[80vw] max-h-[80vh]`;

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
                        <styled.div {...api.getBackdropProps()} className={backdropClassName} />
                        <styled.div {...api.getPositionerProps()} className={positionerClassName}>
                            <styled.div
                                {...api.getContentProps()}
                                className={contentClassName}
                                ref={ref}
                            >
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
