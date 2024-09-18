import classnames from 'classnames'
import React, { Component } from 'react'
import { FontIcon } from 'ui-kit-core'

import { mergeStyles } from '../../utils'

import themeStyles from './buttonTheme.module.css'

export interface ThemeProps {
    accent: string;
    button: string;
    flat: string;
    icon: string;
    inverse: string;
    mini: string;
    neutral: string;
    primary: string;
    toggle: string;
}

type HTMLNodeEvent = React.SyntheticEvent<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>

interface Props {
    theme: ThemeProps;
    accent?: boolean;
    primary?: boolean;
    className?: string;
    disabled?: boolean;
    href?: string;
    icon?: string | React.ReactNode;
    label?: string;
    onMouseUp?: (event: HTMLNodeEvent) => void;
    onMouseLeave?: (event: HTMLNodeEvent) => void;
    onMouseEnter?: (event: HTMLNodeEvent) => void;
    type?: string;
    style?: React.CSSProperties;
		children?: any;
    // todo: что это ?
    mini?: boolean;
    inverse?: boolean;
    neutral?: boolean;
}

class ButtonComponent extends Component<Props> {
    static defaultProps = {
        accent: false,
        className: '',
        mini: false,
        neutral: true,
        primary: false,
        type: 'button',
    }

    buttonNode: React.RefObject<HTMLButtonElement | HTMLAnchorElement> = React.createRef()

    render() {
        const {
            accent,

            children,
            className,
            href,
            icon,
            inverse,
            label,
            mini,
            neutral,
            primary,
            theme,
            type,
            ...others
        } = this.props
        const element = href
            ? 'a'
            : 'button'
        const level = this.getLevel()
        const mouseEvents = {
            onMouseUp: this.handleMouseUp,
            onMouseLeave: this.handleMouseLeave,
        }

        const classes = classnames(
            theme.button,
            [theme.flat],
            {
                [theme[level]]: neutral,
                [theme.mini]: mini,
                [theme.inverse]: inverse,
            },
            className,
        )

        const props = {
            ...others,
            ...mouseEvents,
            href,
            ref: this.buttonNode,
            className: classes,
            disabled: this.props.disabled,
            type: !href
                ? type
                : null,
            'data-react-toolbox': 'button',
        }

        const iconContent = icon
            ? (
                <FontIcon
                    className={theme.icon}
                    // @ts-ignore
                    value={icon}
                />
            )
            : null

        const buttonElement = React.createElement(element, props, iconContent, label, children)

        if (others.onMouseEnter && this.props.disabled) {
            return <span {...mouseEvents}>{buttonElement}</span>
        }

        return buttonElement
    }

    getLevel = () => {
        if (this.props.primary) {
            return 'primary'
        }

        if (this.props.accent) {
            return 'accent'
        }

        return 'neutral'
    }

    handleMouseUp = (event: HTMLNodeEvent) => {
        if (this.buttonNode.current) {
            this.buttonNode.current.blur()
        }

        if (this.props.onMouseUp) {
            this.props.onMouseUp(event)
        }
    }

    handleMouseLeave = (event: HTMLNodeEvent) => {
        if (this.buttonNode.current) {
            this.buttonNode.current.blur()
        }

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event)
        }
    }
}

const Button = (props: Props) => (
    <ButtonComponent
        {...props}
        // @ts-ignore
        theme={props.theme
            ? mergeStyles(props.theme, themeStyles)
            : themeStyles}
    />
)

export { Button }
