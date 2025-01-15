import React, { useId } from 'react';
import { Field as FieldComponent } from '@optimacros-ui/kit';

export type TextAreaProps = {
    error?: React.ReactNode;
    label: string;
    className?: string;
    classNameContainer?: string;
    id?: string | number;
};

export const TextArea: TextAreaProps = ({
    error,
    label,
    className,
    classNameContainer,
    id,
    ...otherProps
}) => {
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
