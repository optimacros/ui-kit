// @ts-nocheck
import classnames from 'classnames'
import React, { Component } from 'react'
import { FontIcon as FontIconComponent } from 'ui-kit-core'

import { mergeStyles } from '../../utils'
import Ripple from '../WSRipple'

import themeStyles from './iconButtonTheme.module.css'

interface Props {
    accent?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    href?: string;
    icon?: string | React.ReactNode;
    inverse?: boolean;
    neutral?: boolean;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onMouseUp?: (event: React.MouseEvent) => void;
    primary?: boolean;
    FontIcon?: React.ElementType;
    theme?:
        | Record<string, string>
        | {
              accent?: string;
              button?: string;
              flat?: string;
              floating?: string;
              icon?: string;
              inverse?: string;
              mini?: string;
              neutral?: string;
              primary?: string;
              raised?: string;
              rippleWrapper?: string;
              toggle?: string;
          };
    type: string;
}

class IconButtonComponent extends Component<Props> {
    static defaultProps = {
        accent: false,
        className: '',
        neutral: true,
        primary: false,
        // eslint-disable-next-line react/default-props-match-prop-types
        type: 'button',
    }

    buttonNode: HTMLButtonElement | null | undefined

    render() {
        const {
            accent,
            children,
            className,
            href,
            icon,
            inverse,
            neutral,
            primary,
            theme,
            type,
            FontIcon,
            ...others
        } = this.props
        const element = href
            ? 'a'
            : 'button'
        const level = this.getLevel()
        const classes = classnames(
            [theme.toggle],
            {
                [theme[level]]: neutral,
                [theme.inverse]: inverse,
            },
            className,
        )

        const props = {
            ...others,
            href,
            ref: (node: HTMLButtonElement) => {
                this.buttonNode = node
            },
            className: classes,
            disabled: this.props.disabled,
            onMouseUp: this.handleMouseUp,
            onMouseLeave: this.handleMouseLeave,
            type: !href
                ? type
                : null,
            'data-react-toolbox': 'button',
        }

        const iconElement =
            typeof icon === 'string'
                ? (
                    <FontIconComponent
                        className={theme.icon}
                        value={icon}
                    />
                )
                : (
                    icon
                )

        return React.createElement(element, props, icon && iconElement, children)
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

    handleMouseUp = (event: React.MouseEvent) => {
        if (this.buttonNode) {
            this.buttonNode.blur()
        }

        if (this.props.onMouseUp) {
            this.props.onMouseUp(event)
        }
    }

    handleMouseLeave = (event: React.MouseEvent) => {
        if (this.buttonNode) {
            this.buttonNode.blur()
        }

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event)
        }
    }
}

const IconButton = (props: Props) => {
    return (
        <Ripple
            {...props}
            rippleCentered
        >
            <IconButtonComponent
                {...props}
                FontIcon={FontIconComponent}
            />
        </Ripple>
    )
}
const ThemedIconButton = (props: Props) => (
    <IconButton
        {...props}
        theme={props.theme
            ? mergeStyles(props.theme, themeStyles)
            : themeStyles}
    />
)

export default IconButton
export { IconButton }
export { ThemedIconButton }
