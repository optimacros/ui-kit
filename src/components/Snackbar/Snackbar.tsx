// @ts-nocheck
import classnames from 'classnames';
import React, { Component } from 'react';
import { BaseButton } from 'ui-kit-core';

export interface SnackbarProps {
    action?: string;
    active?: boolean;
    children?: React.ReactNode;
    className?: string;
    label?: string | React.FC;
    onClick?: () => void;
    onTimeout?: () => void;
    Button?: typeof BaseButton;
    theme?: {
        accept?: string;
        active?: string;
        button?: string;
        cancel?: string;
        label?: string;
        snackbar?: string;
        warning?: string;
    };
    timeout?: number;
    type?: 'accept' | 'cancel' | 'warning';
}

export class SnackbarComponent extends Component<SnackbarProps> {
    componentDidMount() {
        if (this.props.active && this.props.timeout) {
            this.scheduleTimeout(this.props);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.currentTimeout);
    }

    scheduleTimeout = (props) => {
        const { onTimeout, timeout } = props;

        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }

        this.currentTimeout = setTimeout(() => {
            if (onTimeout) {
                onTimeout();
            }

            this.currentTimeout = null;
        }, timeout);
    };

    render() {
        const { action, active, children, label, onClick, theme, type, Button } = this.props;
        const className = classnames(
            [theme.snackbar, theme[type]],
            {
                [theme.active]: active,
            },
            this.props.className,
        );

        return (
            <div className={theme.portal}>
                <div data-react-toolbox="snackbar" className={className}>
                    <span className={theme.label}>
                        {label}
                        {children}
                    </span>

                    {action && Button && (
                        <Button className={theme.button} label={action} onClick={onClick} />
                    )}
                </div>
            </div>
        );
    }
}
