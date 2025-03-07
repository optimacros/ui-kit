import { useEffect, useState } from 'react';
import { Modal, ModalProps } from '..';

export const Basic = (props: ModalProps) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setIsOpen(props.isOpen);
    }, [props.isOpen]);

    const onRequestClose = () => {
        setIsOpen(false);
    };

    return <Modal {...props} isOpen={isOpen} onRequestClose={onRequestClose} />;
};
