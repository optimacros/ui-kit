import React, { forwardRef } from 'react';
import { clsx } from '@optimacros-ui/utils';
import { mergeStyles } from '../../utils';
import { Input as BaseInput } from './Input';

import styles from './Input.module.css';

interface Props {
    hint?: string;
    name?: string;
    placeholder?: string;
    type?: string;
    label?: string;
    title?: string;
    min?: string;
    max?: string;
    value?: string | number;
    collapsed?: boolean;
    disabled?: boolean;
    className?: string;
    autoComplete?: string;
    theme?: Record<string, string>;
    onFocus?: (event: React.FocusEvent) => void;
    onChange?: (value: string | number, event?: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | React.JSX.Element;
}

const Input = (props: Props, ref) => {
    const { hint, placeholder, label, title, collapsed, theme: customTheme, ...otherProps } = props;
    const theme: Record<string, string> = mergeStyles(customTheme, styles);
    const newLabel = !collapsed ? label || title : '';
    const className = clsx(
        {
            [theme.collapsed]: collapsed,
        },
        props.className,
    );

    return (
        <BaseInput
            {...otherProps}
            theme={theme}
            ref={ref}
            placeholder={placeholder}
            label={newLabel}
            className={className}
        />
    );
};

export default forwardRef(Input);
