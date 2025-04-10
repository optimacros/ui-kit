import { useId } from 'react';
import type React from 'react';

import { Field as FieldComponent } from '@optimacros-ui/field';
import { forward } from '@optimacros-ui/store';
import './styles.css';

export type TextAreaProps = {
    value?: string;
    error?: React.ReactNode;
    label?: string;
    className?: string;
    classNameContainer?: string;
    id?: string;
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

export const TextArea = forward<TextAreaProps, HTMLTextAreaElement>(
    ({ value, error, label, className, classNameContainer, id, readonly, ...rest }, ref) => {
        const generatedId = useId();

        return (
            <FieldComponent.Root
                status={getStatus(!!error, readonly)}
                className={classNameContainer}
                data-tag="internal"
            >
                {label && (
                    <FieldComponent.Label htmlFor={id ?? generatedId}>{label}</FieldComponent.Label>
                )}
                <FieldComponent.TextArea
                    {...rest}
                    ref={ref}
                    id={id ?? generatedId}
                    value={value}
                    className={className}
                />
                <FieldComponent.Error>{error}</FieldComponent.Error>
            </FieldComponent.Root>
        );
    },
);
