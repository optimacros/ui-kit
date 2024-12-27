import { memo, ReactNode } from 'react';
import { Modal as UIModal } from '@optimacros-ui/kit/src/components/Modal/src';

export interface ModalProps {
    isOpen: boolean;
    title?: ReactNode;
    compact?: boolean;
    nonDraggable?: boolean;
    draggableTarget?: string;
    isFatalError?: boolean;
    customHeaderButton?: ReactNode;
    headerClassName?: string;
    contentClassName?: string;
}

/*
    static defaultProps = {
        nonDraggable: false,
        draggableTarget: `.${styles.Header}`,
    };
    */

export const Modal = memo<ModalProps>(() => {
    return <UIModal.Root>asd</UIModal.Root>;
});
