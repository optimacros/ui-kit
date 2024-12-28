import {
    memo,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from 'react';
import { Modal as UIModal } from '@optimacros-ui/modal';
import { Flex } from '@optimacros-ui/flex';
import { IconButton } from '@optimacros-ui/icon-button';

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

const ModalContent = memo<ModalProps>(
    ({
        title,
        customHeaderButton,
        headerClassName,
        contentClassName,
        onRequestClose,
        children,
        isFatalError,
        isOpen,
        nonDraggable,
        draggableTarget = `[data-scope='dialog'][data-part='header']`,
    }) => {
        const containerRef = useRef<HTMLDivElement>();
        const api = UIModal.useApi();

        // TODO x3
        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
            api.setOpen(isOpen);
        }, [isOpen, api.open]);

        useLayoutEffect(() => {
            if (!api.open || nonDraggable || !draggableTarget || !containerRef?.current) {
                return;
            }

            const elements = containerRef.current.querySelectorAll(
                draggableTarget,
            ) as NodeListOf<HTMLDivElement>;

            elements.forEach((element) => {
                element.dataset.draggablePart = 'handle';
            });
        }, [api.open, nonDraggable, draggableTarget]);

        const Container = nonDraggable ? UIModal.Content : UIModal.DraggableContent;

        return (
            <Container ref={containerRef}>
                <UIModal.Header className={headerClassName}>
                    <UIModal.Title>{title}</UIModal.Title>

                    {!!customHeaderButton && (
                        <Flex data-scope="dialog" data-part="custom-header-container">
                            {customHeaderButton}
                        </Flex>
                    )}

                    {onRequestClose && !isFatalError && (
                        <UIModal.CloseTrigger asChild>
                            <IconButton icon="close" />
                        </UIModal.CloseTrigger>
                    )}
                </UIModal.Header>

                <UIModal.ScrollContainer className={contentClassName}>
                    {children}
                </UIModal.ScrollContainer>
            </Container>
        );
    },
);

// TODO яхз, ни controllable, ни open.controlled не помогают - нужно самому делать setopen
// раньше что-то работало, сейчас перестало. надо разобраться
export const Modal = memo<ModalProps>((props) => {
    const { isOpen, onRequestClose, compact } = props;

    const handleOpenChange = useCallback(
        (details: UIModal.OpenChangeDetails) => {
            const { open } = details;

            if (onRequestClose && isOpen && !open) {
                onRequestClose();
            }
        },
        [onRequestClose, isOpen],
    );

    const rootProps: Partial<UIModal.Props> = useMemo(
        () => ({
            // TODO x3
            controllable: true,
            open: isOpen,
            onOpenChange: handleOpenChange,
        }),
        [isOpen, handleOpenChange],
    );

    return (
        <UIModal.Root {...rootProps} data-compact={compact}>
            <ModalContent {...props} />
        </UIModal.Root>
    );
});
