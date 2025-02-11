import { memo, ChangeEvent, KeyboardEvent } from 'react';
import { Field } from '@optimacros-ui/field';
import { Icon } from '@optimacros-ui/icon';
import { forward } from '@optimacros-ui/store';

export interface ISearchContainer {
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
    forward<ISearchContainer, HTMLInputElement>(
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
        ) => (
            <Field.Root data-role="search-container" className={style}>
                <Field.Input
                    ref={ref}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    value={value}
                    placeholder={placeholder}
                />
                {!!showIcon && (
                    <Field.FloatingIcon onClick={onClose} position="right">
                        <Icon value="close" />
                    </Field.FloatingIcon>
                )}
            </Field.Root>
        ),
    ),
);

SearchContainer.displayName = 'SearchContainer';
