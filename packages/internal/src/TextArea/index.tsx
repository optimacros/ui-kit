//@ts-nocheck

import React, { useId } from 'react';
import { Field as FieldComponent } from '@optimacros-ui/field';

export type TextAreaProps = {
    error?: React.ReactNode;
    label: string;
    className?: string;
    classNameContainer?: string;
    id?: string | number;
};

export const TextArea = ({
    error,
    label,
    className,
    classNameContainer,
    id,
    ...otherProps
}: TextAreaProps) => {
    const generatedId = useId();

    return (
        <FieldComponent.Root status={error ? 'error' : 'default'}>
            {label && (
                <FieldComponent.FloatingLabel htmlFor={id ?? generatedId}>
                    {label}
                </FieldComponent.FloatingLabel>
            )}
            <FieldComponent.TextArea id={id ?? generatedId} {...otherProps} />
            <FieldComponent.FloatingError>{error}</FieldComponent.FloatingError>
        </FieldComponent.Root>
    );
};
