import classnames from 'classnames';
import React, { Component } from 'react';

import { Box } from './Box';
import type { InitialProps, Theme } from './index';
import { mergeStyles } from '@optimacros/ui-kit-utils';

import checkBoxStyle from './Checkbox.module.css';

export interface CheckboxComponentProps extends InitialProps {
    theme: Required<Theme>;
}

export class CheckboxComponent extends Component<React.PropsWithChildren<CheckboxComponentProps>> {
    constructor(props: CheckboxComponentProps) {
        super(props);

        this.inputNode = React.createRef();
    }

    inputNode: React.RefObject<HTMLInputElement>;

    render(): React.JSX.Element {
        const {
            checked = false,
            children,
            disabled = false,
            label,
            name,
            style,
            onChange,
            onMouseEnter,
            onMouseLeave,
            onClick,
            theme: customTheme,
            ...others
        } = this.props;

        const theme = mergeStyles(customTheme, checkBoxStyle) as Required<Theme>;

        const className = classnames(
            theme.field,
            { [theme.disabled]: this.props.disabled },
            this.props.className,
        );

        return (
            <label
                data-react-toolbox="checkbox"
                className={className}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                <input
                    {...others}
                    defaultChecked={checked}
                    className={theme.input}
                    disabled={disabled}
                    name={name}
                    onClick={this.handleToggle}
                    ref={this.inputNode}
                    type="checkbox"
                />

                <Box checked={checked} disabled={disabled} style={style} theme={theme} />

                {label && (
                    <span data-react-toolbox="label" className={theme.text}>
                        {label}
                    </span>
                )}

                {children}
            </label>
        );
    }

    handleToggle = (event: React.MouseEvent): void => {
        if (event.pageX !== 0 && event.pageY !== 0) {
            this.blur();
        }

        if (!this.props.disabled && this.props.onChange) {
            this.props.onChange(!this.props.checked, event);
        }
    };

    blur(): void {
        if (this.inputNode) {
            this.inputNode.current?.blur();
        }
    }

    focus(): void {
        if (this.inputNode) {
            this.inputNode.current?.focus();
        }
    }
}
