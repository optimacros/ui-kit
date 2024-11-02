// @ts-nocheck
import classnames from 'classnames';
import React, { Component } from 'react';

import { mergeStyles, prefixer } from '@optimacros/ui-kit-utils';

import defaultTheme from './progressBarTheme.module.css';

interface Props {
    buffer?: number;
    className?: string;
    disabled?: boolean;
    max?: number;
    min?: number;
    mode?: 'determinate' | 'indeterminate';
    multicolor?: boolean;
    theme?: {
        buffer?: string;
        circle?: string;
        circular?: string;
        indeterminate?: string;
        linear?: string;
        multicolor?: string;
        path?: string;
        value?: string;
    };
    type?: 'linear' | 'circular';
    value?: number;
    innerRef?: React.RefObject<HTMLDivElement>;
}

export class ProgressBar extends Component<Props> {
    static defaultProps = {
        buffer: 0,
        className: '',
        max: 100,
        min: 0,
        mode: 'indeterminate',
        multicolor: false,
        type: 'linear',
        value: 0,
    };

    render() {
        const {
            className,
            disabled,
            max,
            min,
            mode,
            multicolor,
            type,
            theme: customTheme,
            value,
            innerRef,
        } = this.props;
        const theme = customTheme ? mergeStyles(defaultTheme, customTheme) : defaultTheme;

        const _className = classnames(
            theme[type],
            {
                [theme.indeterminate]: mode === 'indeterminate',
                [theme.multicolor]: multicolor,
            },
            className,
        );

        return (
            <div
                ref={innerRef}
                disabled={disabled}
                data-react-toolbox="progress-bar"
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                className={_className}
            >
                {type === 'circular' ? this.renderCircular() : this.renderLinear()}
            </div>
        );
    }

    renderCircular() {
        const { theme: customTheme } = this.props;
        const theme = customTheme ? mergeStyles(defaultTheme, customTheme) : defaultTheme;

        return (
            <svg className={theme.circle} viewBox="0 0 60 60">
                <circle
                    className={theme.path}
                    style={this.circularStyle()}
                    cx="30"
                    cy="30"
                    r="25"
                />
            </svg>
        );
    }

    renderLinear() {
        const { theme: customTheme } = this.props;
        const theme = customTheme ? mergeStyles(defaultTheme, customTheme) : defaultTheme;
        const { buffer, value } = this.linearStyle();

        return (
            <div>
                <span data-ref="buffer" className={theme.buffer} style={buffer} />
                <span data-ref="value" className={theme.value} style={value} />
            </div>
        );
    }

    calculateRatio(value: number) {
        if (value < this.props.min) {
            return 0;
        }

        if (value > this.props.max) {
            return 1;
        }

        return (value - this.props.min) / (this.props.max - this.props.min);
    }

    circularStyle() {
        if (this.props.mode !== 'indeterminate') {
            return {
                strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`,
            };
        }
    }

    linearStyle() {
        if (this.props.mode !== 'indeterminate') {
            return {
                buffer: prefixer({
                    transform: `scaleX(${this.calculateRatio(this.props.buffer)})`,
                }),
                value: prefixer({ transform: `scaleX(${this.calculateRatio(this.props.value)})` }),
            };
        }

        return {};
    }
}
