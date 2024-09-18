// @ts-nocheck
import classNames from 'classnames'
import _ from 'lodash'
import React from 'react'
import { Tooltip } from 'ui-kit-core'

import { ThemedIconButton } from './IconButton'
import { mergeStyles } from '../../utils'

import themeIconButton from './IconButton.module.css'

interface Props {
    icon?: string;
    label?: string;
    tooltip?: string;
    theme?: Record<string, string>;
    className?: string;
    disabled?: boolean;
    onClick: () => void;
}

// eslint-disable-next-line react/prefer-stateless-function
export class WSIconButton extends React.Component<Props> {
    static defaultProps = {
        theme: {
            IconButton: 'IconButton',
        },
    }

    render() {
        const { icon, label, theme: defaultTheme, ...otherProps } = this.props
        const theme = mergeStyles(defaultTheme, themeIconButton)
        const iconIsString = _.isString(icon)
        const className = classNames(theme.IconButton, this.props.className)

        return (
            <Tooltip
                {...otherProps}
                className={className}
                composedComponent={ThemedIconButton}
                composedComponentProps={!iconIsString
                    ? { icon }
                    : null}
                data-label={label}
                icon={iconIsString
                    ? icon
                    : null}
                theme={theme}
                tooltip={this.props.label || this.props.tooltip}
            />
        )
    }
}
