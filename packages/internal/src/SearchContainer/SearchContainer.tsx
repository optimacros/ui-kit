import { memo, ChangeEvent, KeyboardEvent, forwardRef } from 'react';
import { Field } from '@optimacros-ui/field';
import { Icon } from '@optimacros-ui/icon';
import styles from './SearchContainer.module.css';
import { clsx } from '@optimacros-ui/utils';

export interface SearchContainerProps {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onClose?: () => void;
    style?: any;
    showIcon?: boolean;
}

export const SearchContainer = memo(
    forwardRef<HTMLInputElement, SearchContainerProps>(
        (
            {
                name,
                value,
                onChange,
                placeholder,
                onBlur,
                onKeyDown,
                style,
                onClose,
                showIcon = true,
            },
            ref,
        ) => {
            const cn = clsx(styles.SearchContainer, style);

            return (
                <Field.Root
                    data-role="search-container"
                    className={cn}
                    data-testid="search-container"
                >
                    <Field.Input
                        ref={ref}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        value={value}
                        placeholder={placeholder}
                        className={styles.InputElement}
                        type="text"
                        autoFocus
                        data-testid="search-container-input"
                    />
                    {!!showIcon && (
                        <Field.FloatingIcon
                            onClick={onClose}
                            position="right"
                            data-testid="search-container-clear-trigger"
                        >
                            <Icon value="close" className={styles.CloseIcon} />
                        </Field.FloatingIcon>
                    )}
                </Field.Root>
            );
        },
    ),
);

SearchContainer.displayName = 'SearchContainer';
