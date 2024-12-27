import React, { useId } from 'react';
import { Field as FieldComponent } from '@optimacros-ui/kit';

export type TextAreaProps = {
    error?: React.ReactNode;
    label: string;
    className?: string;
    classNameContainer?: string;
};

export const TextArea: TextAreaProps = ({
    error,
    label,
    className,
    classNameContainer,
    ...otherProps
}) => {
    const id = useId();

    return (
        <FieldComponent.Root status={error ? 'error' : 'default'}>
            {label && (
                <FieldComponent.FloatingLabel htmlFor={id}>{label}</FieldComponent.FloatingLabel>
            )}
            <FieldComponent.TextArea id={id} {...otherProps} />
            <FieldComponent.FloatingError>{error}</FieldComponent.FloatingError>
        </FieldComponent.Root>
    );
};
