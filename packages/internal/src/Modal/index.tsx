import { memo, PropsWithChildren, ReactNode, useLayoutEffect, useRef } from 'react';
import { Modal as UIModal } from '@optimacros-ui/modal';
import { Flex } from '@optimacros-ui/flex';
import { IconButton } from '@optimacros-ui/icon-button';
import { forward } from '@optimacros-ui/store';

export interface ModalProps extends PropsWithChildren {
    isOpen: boolean;
    onRequestClose: () => void;
    title?: ReactNode;
    compact?: boolean;
    nonDraggable?: boolean;
    draggableTarget?: string;
    isFatalError?: boolean;
    customHeaderButton?: ReactNode;
    headerClassName?: string;
    contentClassName?: string;
}

const ModalContent = memo(
    forward<ModalProps, 'div'>(
        (
            {
                title,
                customHeaderButton,
                headerClassName,
                contentClassName,
                onRequestClose,
                children,
                isFatalError,
                nonDraggable,
                draggableTarget = `[data-scope='dialog'][data-part='header']`,
            },
            ref,
        ) => {
            const containerRef = useRef<HTMLDivElement>();
            const open = UIModal.useSelector(({ open }) => open);

            useLayoutEffect(() => {
                if (!open || nonDraggable || !draggableTarget || !containerRef?.current) {
                    return;
                }

                const elements = containerRef.current.querySelectorAll(
                    draggableTarget,
                ) as NodeListOf<HTMLDivElement>;

                elements.forEach((element) => {
                    element.dataset.draggablePart = 'handle';
                });
            }, [open, nonDraggable, draggableTarget]);

            const Container = nonDraggable ? UIModal.Content : UIModal.DraggableContent;

            return (
                <Container ref={containerRef}>
                    <Flex direction="column" style={{ overflow: 'hidden' }} ref={ref}>
                        <UIModal.Header className={headerClassName}>
                            <UIModal.Title>{title}</UIModal.Title>

                            {!!customHeaderButton && (
                                <Flex data-scope="dialog" data-part="custom-header-container">
                                    {customHeaderButton}
                                </Flex>
                            )}

                            {onRequestClose && !isFatalError && (
                                <UIModal.CloseTrigger asChild>
                                    <IconButton icon="close" variant="transparent" />
                                </UIModal.CloseTrigger>
                            )}
                        </UIModal.Header>

                        <UIModal.ScrollContainer className={contentClassName}>
                            {children}
                        </UIModal.ScrollContainer>
                    </Flex>
                </Container>
            );
        },
    ),
);

export const Modal = memo(
    forward<ModalProps, 'div'>((props, ref) => {
        const { isOpen, onRequestClose, compact } = props;
        return (
            <UIModal.Root
                open={isOpen}
                onOpenChange={(details) => {
                    !details.open && onRequestClose();
                }}
                data-compact={compact}
                closeOnInteractOutside={false}
                controllable
            >
                <ModalContent {...props} ref={ref} />
            </UIModal.Root>
        );
    }),
);
