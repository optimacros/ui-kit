import classNames from 'classnames';
import type { ButtonInitialProps, ButtonTheme } from './index';
import { Icon } from '../Icon';
import React from 'react';

export interface ButtonComponentProps extends Partial<ButtonInitialProps> {
    theme: ButtonTheme;
}
type ButtonProps = {
    variant: 'primary' | 'accent' | 'bordered' | 'neutral';
    shape: 'raised' | 'floating' | 'flat';
};

export class ButtonComponent extends React.Component<ButtonComponentProps> {
    constructor(props: ButtonComponentProps) {
        super(props);

        this.buttonNode = React.createRef();
    }

    buttonNode: React.RefObject<HTMLButtonElement | HTMLAnchorElement>;

    render(): React.JSX.Element {
        const {
            className = '',
            type = 'button',
            label,
            icon,
            href,
            theme,
            inverse,
            mini,
            neutral,
            uppercase,
            gray,
            warning,
            buttonColor,
            fontSize,
            fontColor,
            children,
            accent,
            primary,
            bordered,
            floating,
            raised,
            ...otherProps
        } = this.props;

        const element = href ? 'a' : 'button';
        const level = this.getLevel();
        const shape = this.getShape();

        const mouseEvents = {
            onMouseUp: this.handleMouseUp,
            onMouseLeave: this.handleMouseLeave,
        };

        const classList = classNames(
            theme.button,
            [theme[shape]],
            {
                [theme[level]]: neutral ?? true,
                [theme.mini]: mini ?? false,
                [theme.inverse]: inverse ?? false,
            },
            className,
        );

        const style = {
            backgroundColor: buttonColor,
            color: fontColor,
            fontSize,
        };

        const props = {
            ...otherProps,
            ...mouseEvents,
            href,
            ref: this.buttonNode,
            className: classList,
            type: !href ? type : null,
            'data-react-toolbox': 'button',
            style,
        };

        const iconContent = icon ? <Icon className={theme.icon} value={icon} /> : null;

        const buttonElement = React.createElement(element, props, iconContent, label, children);

        if (this.props.onMouseEnter && this.props.disabled) {
            return <span {...mouseEvents}>{buttonElement}</span>;
        }

        return buttonElement;
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

    getShape = (): 'raised' | 'floating' | 'flat' => {
        if (this.props.raised) {
            return 'raised';
        }

        if (this.props.floating) {
            return 'floating';
        }

        return 'flat';
    };
}
