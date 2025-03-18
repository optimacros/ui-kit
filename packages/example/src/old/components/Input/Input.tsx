/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { clsx } from '@optimacros-ui/utils';
import { FontIcon } from '../FontIcon';
import { mergeStyles, isValuePresent } from '../../utils';

import themeStyles from './theme.module.css';

interface Props {
    placeHolder?: string;
    children?: React.ReactNode;
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    error?: string | React.JSX.Element;
    oneLineError?: boolean;
    floating?: boolean;
    hint?: string | React.JSX.Element;
    icon?: string | React.JSX.Element;
    label?: string | React.JSX.Element;
    maxLength?: number;
    multiline?: boolean;
    name?: string;
    onBlur?: (event: any) => void;
    onChange?: (value: string | number, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onKeyPress?: (event: React.KeyboardEvent) => void;
    ref?: React.LegacyRef<Input>;
    required?: boolean;
    placeholder?: string;
    role?: string;
    rows?: number;
    theme?: {
        bar?: string;
        counter?: string;
        disabled?: string;
        error?: string;
        errored?: string;
        hidden?: string;
        hint?: string;
        icon?: string;
        input?: string;
        inputElement?: string;
        required?: string;
        withIcon?: string;
    };
    type?: string;
    value?: number | string | object;
}

export class Input extends React.Component<Props> {
    static defaultProps = {
        className: '',
        hint: '',
        disabled: false,
        floating: true,
        multiline: false,
        required: false,
        role: 'input',
        type: 'text',
    };

    inputNode: HTMLInputElement | undefined;

    componentDidMount() {
        if (this.props.multiline) {
            window.addEventListener('resize', this.handleAutoresize);
            this.handleAutoresize();
        }
    }

    componentDidUpdate(prevProps: Props) {
        // resize the textarea, if nessesary
        if (this.props.multiline) {
            this.handleAutoresize();
        }
        if (!this.props.multiline && prevProps.multiline) {
            window.addEventListener('resize', this.handleAutoresize);
        } else if (this.props.multiline && !prevProps.multiline) {
            window.removeEventListener('resize', this.handleAutoresize);
        }
    }

    componentWillUnmount() {
        if (this.props.multiline) {
            window.removeEventListener('resize', this.handleAutoresize);
        }
    }

    render() {
        const {
            children,
            defaultValue,
            disabled,
            error,
            oneLineError,
            floating,
            hint,
            icon,
            name,
            label: labelText,
            maxLength,
            multiline,
            required,
            role,
            theme: customTheme,
            type,
            value,
            onKeyPress,
            rows = 1,
            ...others
        } = this.props;

        const theme = customTheme ? mergeStyles(themeStyles, customTheme) : themeStyles;

        const length = maxLength && value ? value.length : 0;
        const labelClassName = clsx(theme.label, {
            [theme.fixed]: !floating,
        });

        const className = clsx(
            theme.input,
            {
                [theme.disabled]: disabled,
                [theme.errored]: error,
                [theme.oneLineError]: oneLineError,
                [theme.hidden]: type === 'hidden',
                [theme.withIcon]: icon,
            },
            this.props.className,
        );

        const valuePresent = isValuePresent(value) || isValuePresent(defaultValue);

        const inputElementProps = {
            ...others,
            className: clsx(theme.inputElement, {
                [theme.filled]: valuePresent,
            }),
            onChange: this.handleChange,
            ref: (node) => {
                if (node) {
                    this.inputNode = node;
                }
            },
            role,
            name,
            defaultValue,
            disabled,
            required,
            type,
            value,
        };

        if (!multiline) {
            inputElementProps.maxLength = maxLength;
            inputElementProps.onKeyPress = onKeyPress;
        } else {
            inputElementProps.rows = rows;
            inputElementProps.onKeyPress = this.handleKeyPress;
        }

        return (
            <div data-react-toolbox="input" className={className}>
                {React.createElement(multiline ? 'textarea' : 'input', inputElementProps)}

                {icon && <FontIcon className={theme.icon} value={icon} />}

                <span className={theme.bar} />

                {labelText && (
                    <label title={labelText} className={labelClassName}>
                        {labelText}
                        {required && <span className={theme.required}> * </span>}
                    </label>
                )}

                {hint && (
                    <span hidden={labelText} className={theme.hint}>
                        {hint}
                    </span>
                )}

                {!oneLineError && error && <span className={theme.error}>{error}</span>}

                {oneLineError && error ? (
                    <div className={theme.error}>{error}</div>
                ) : (
                    <div className={theme.hidden} />
                )}

                {maxLength && (
                    <span className={theme.counter}>
                        {length}/{maxLength}
                    </span>
                )}
                {children}
            </div>
        );
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange, multiline, maxLength } = this.props;
        const valueFromEvent = event.target.value;

        // Trim value to maxLength if that exists (only on multiline inputs).
        // Note that this is still required even tho we have the onKeyPress filter
        // because the user could paste smt in the textarea.
        const haveToTrim = multiline && maxLength && event.target.value.length > maxLength;
        const value = haveToTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;

        // propagate to to store and therefore to the input
        if (onChange) {
            onChange(value, event);
        }
    };

    handleAutoresize = () => {
        if (!this.inputNode) {
            return;
        }

        const element = this.inputNode;
        const { rows } = this.props;

        if (typeof rows === 'number' && !isNaN(rows)) {
            element.style.height = null;
        } else {
            // compute the height difference between inner height and outer height
            const style = window.getComputedStyle(element, null);
            const heightOffset =
                style.boxSizing === 'content-box'
                    ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
                    : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

            // resize the input to its content size
            element.style.height = 'auto';
            element.style.height = `${element.scrollHeight + heightOffset}px`;
        }
    };

    handleKeyPress = (event) => {
        // prevent insertion of more characters if we're a multiline input
        // and maxLength exists
        const { multiline, maxLength, onKeyPress } = this.props;

        if (multiline && maxLength) {
            // check if smt is selected, in which case the newly added charcter would
            // replace the selected characters, so the length of value doesn't actually
            // increase.
            const isReplacing = event.target.selectionEnd - event.target.selectionStart;
            const { value } = event.target;

            if (!isReplacing && value.length === maxLength) {
                event.preventDefault();
                event.stopPropagation();

                return;
            }
        }

        if (onKeyPress) {
            onKeyPress(event);
        }
    };

    blur() {
        if (this.inputNode) {
            this.inputNode.blur();
        }
    }

    focus() {
        if (this.inputNode) {
            this.inputNode.focus();
        }
    }
}
