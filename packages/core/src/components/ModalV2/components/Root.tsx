import { forward, styled } from '@optimacros/ui-kit-store';
import { RootProvider } from './context';
import React, { useMemo } from 'react';
import { Context } from '@zag-js/dialog';
import { Portal } from '@zag-js/react';
import { tw } from '@optimacros/ui-kit-utils';

export const backdropClassName = tw`fixed z-[var(--z-index-dialog-backdrop)] inset-0 bg-[var(--Modal-overlay-bg)]`;
export const positionerClassName = tw`fixed z-[var(--z-index-dialog-backdrop)] inset-0 flex items-center justify-center h-screen w-screen`;
export const contentClassName = tw`flex flex-col items-start rounded-[var(--border-radius)] bg-[var(--Modal-bg)]
border-1 border-solid border-divider max-w-[80vw] max-h-[80vh]`;

interface Props extends React.PropsWithChildren, Partial<Context> {
    onRequestClose?: () => void;
}

export const Root = forward<Props, 'div'>(
    (
        {
            children,
            open,
            onRequestClose,
            onInteractOutside,
            onFocusOutside,
            onPointerDownOutside,
            onEscapeKeyDown,
            onOpenChange,
            ...rest
        },
        ref,
    ) => {
        const callbacks = useMemo(() => {
            const cbs = {
                onInteractOutside: onInteractOutside || onRequestClose,
                onFocusOutside: onFocusOutside || onRequestClose,
                onPointerDownOutside: onPointerDownOutside || onRequestClose,
                onEscapeKeyDown: onEscapeKeyDown || onRequestClose,
                onOpenChange:
                    onOpenChange ||
                    (onRequestClose &&
                        ((details) => {
                            if (!details.open) {
                                onRequestClose();
                            }
                        })),
            };

            return cbs;
        }, [
            onRequestClose,
            onInteractOutside,
            onFocusOutside,
            onPointerDownOutside,
            onEscapeKeyDown,
            onOpenChange,
        ]);

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
