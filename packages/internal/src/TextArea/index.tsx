//@ts-nocheck

import React, { useId } from 'react';
import { Field as FieldComponent } from '@optimacros-ui/field';

export type TextAreaProps = {
    value?: string;
    error?: React.ReactNode;
    label?: string;
    className?: string;
    classNameContainer?: string;
    id?: string | number;
    readonly?: boolean;
};

const getStatus = (error: boolean, readOnly: boolean) => {
    switch (true) {
        case error:
            return 'error';
        case readOnly:
            return 'readonly';
        default:
            return 'default';
    }
};

export const TextArea = ({
    value,
    error,
    label,
    className,
    classNameContainer,
    id,
    readonly,
}: TextAreaProps) => {
    const generatedId = useId();

    return (
        <FieldComponent.Root status={getStatus(!!error, readonly)}>
            {label && (
                <FieldComponent.FloatingLabel htmlFor={id ?? generatedId}>
                    {label}
                </FieldComponent.FloatingLabel>
            )}
            <FieldComponent.TextArea id={id ?? generatedId} value={value} />
            <FieldComponent.FloatingError>{error}</FieldComponent.FloatingError>
        </FieldComponent.Root>
    );
};
