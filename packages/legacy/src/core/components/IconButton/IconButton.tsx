import classnames from 'classnames';
import type { MouseEvent } from 'react';
import { Component, createElement, createRef } from 'react';
import type React from 'react';

import type { IconButtonProps, IconButtonTheme } from './index';
import { FontIcon } from '../FontIcon';

export interface Props extends IconButtonProps {
    theme: IconButtonTheme & { toggle: string };
}

export class IconButtonComponent extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.buttonNode = createRef();
    }

    buttonNode: React.RefObject<HTMLButtonElement>;

    render(): React.JSX.Element {
        const {
            inverse = false,
            neutral = true,
            disabled = false,
            type = 'button',
            accent,
            children,
            className = '',
            href,
            icon,
            primary,
            theme,
            bordered,
            ...others
        } = this.props;

        const element = href ? 'a' : 'button';

        const level = this.getLevel();
        const classes = classnames(
            [theme.toggle],
            {
                [theme[level]]: neutral,
                [theme.inverse]: inverse,
            },
            className,
        );

        const props = {
            ...others,
            href,
            ref: this.buttonNode,
            className: classes,
            disabled: disabled,
            onMouseUp: this.handleMouseUp,
            onMouseLeave: this.handleMouseLeave,
            type: !href ? type : null,
            'data-react-toolbox': 'button',
        };

        const iconElement =
            typeof icon === 'string' ? <FontIcon className={theme.icon} value={icon} /> : icon;

        return createElement(element, props, icon && iconElement, children);
    }

    getLevel = (): 'primary' | 'accent' | 'bordered' | 'neutral' => {
        if (this.props.primary) {
            return 'primary';
        }

        if (this.props.accent) {
            return 'accent';
        }

        if (this.props.bordered) {
            return 'bordered';
        }

        return 'neutral';
    };

    handleMouseUp = (event: MouseEvent<HTMLButtonElement>): void => {
        this.buttonNode.current?.blur();

        if (this.props.onMouseUp) {
            this.props.onMouseUp(event);
        }
    };

    handleMouseLeave = (event: MouseEvent<HTMLButtonElement>): void => {
        this.buttonNode.current?.blur();

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };
}
