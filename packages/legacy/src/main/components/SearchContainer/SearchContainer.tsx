import classNames from 'classnames';
import React from 'react';
import { FontIcon } from 'ui-kit-core';

import styles from './SearchContainer.module.css';

interface Props {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onClose?: () => void;
    style?: any;
    showIcon?: boolean;
}

export const SearchContainer: React.FC<Props> = ({
    value,
    onChange,
    onClose,
    name,
    style,
    onBlur,
    placeholder,
    onKeyDown,
    showIcon = true,
}) => {
    const className = classNames({
        [styles.SearchContainer]: true,
        [style]: style,
    });

    const renderIcon = () => {
        if (!showIcon) {
            return;
        }

        return (
            <FontIcon
                className={styles.CloseIcon}
                onClick={() => onClose && onClose()}
                value="close"
            />
        );
    };

    return (
        <div>
            <div className={className}>
                <input
                    type="text"
                    className={styles.InputElement}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    onKeyDown={onKeyDown}
                    name={name}
                    autoFocus
                />

                {renderIcon()}
            </div>
        </div>
    );
};
