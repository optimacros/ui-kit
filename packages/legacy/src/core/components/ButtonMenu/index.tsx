import classNames from 'classnames';
import React, { PureComponent } from 'react';

import { mergeStyles } from '../../utils/mergeStyle';
import { Button, ButtonTheme } from '../Button';
import { Dropdown } from '../Dropdown';
import { FontIcon } from '../FontIcon';
import { Menu } from '../Menu';
import { Tooltip, TooltipProps, TooltipTheme } from '../Tooltip';

import buttonMenuTheme from './ButtonMenu.module.css';

export type ButtonMenuTheme = Partial<ButtonTheme> & Partial<TooltipTheme>;

export type Props = {
    label?: string;
    disabled?: boolean;
    className?: string;
    uppercase?: boolean;
    showOnlyIcon?: boolean;
    arrowUp?: boolean;
    menuRootContainerClassName?: string;
    onVisibleChange?: (visible: boolean) => void;
    visible?: boolean;
    theme?: ButtonMenuTheme;
    icon?: string | React.JSX.Element;
    dataName?: string;
    classNameDropdownContainer?: string;
    closeOnSelect?: boolean;
} & Partial<TooltipProps>;

export type ButtonMenuProps = React.PropsWithChildren<Props>;

export class ButtonMenu extends PureComponent<ButtonMenuProps> {
    render(): React.JSX.Element {
        return (
            <Dropdown
                //@ts-ignore
                overlay={this.renderMenu()}
                trigger={['click']}
                disabled={this.props.disabled}
                onVisibleChange={this.props.onVisibleChange}
                visible={this.props.visible}
                className={this.props.classNameDropdownContainer}
                closeOnSelect={this.props.closeOnSelect}
            >
                {this.renderButton()}
            </Dropdown>
        );
    }

    renderMenu(): React.JSX.Element {
        const { menuRootContainerClassName } = this.props;
        const theme = mergeStyles(this.props.theme, buttonMenuTheme);
        const className = classNames(menuRootContainerClassName, theme.MenuRootContainerClassName);

        return <Menu className={className}>{this.props.children}</Menu>;
    }

    renderButton(): React.JSX.Element {
        const {
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            tooltipDelay,
            tooltipPosition,
            tooltipOffset,
            theme,
            showOnlyIcon,
            arrowUp,
            dataName,
            onVisibleChange,
            visible,
            className,
            menuRootContainerClassName,
            classNameDropdownContainer,
            uppercase,
            label,
            closeOnSelect,
            ...otherProps
        } = this.props;

        const customTheme = mergeStyles(theme, buttonMenuTheme);

        const updatedClassName = classNames(
            {
                [customTheme.ButtonMenu]: true,
                [customTheme.ButtonMenu__uppercase]: uppercase ?? false,
                [customTheme.ButtonMenu__showOnlyIcon]: showOnlyIcon ?? false,
            },
            className,
        );

        const classNameText = customTheme.buttonText;
        const classNameIcon = customTheme.buttonIcon;

        const iconValue = arrowUp ? 'arrow_drop_up' : 'arrow_drop_down';

        if (tooltip) {
            return (
                <Tooltip
                    composedComponent={Button}
                    composedComponentProps={{
                        ...otherProps,
                        'data-label': label,
                        'data-name': dataName,
                    }}
                    className={updatedClassName}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    theme={customTheme}
                    tooltip={tooltip}
                    tooltipDelay={tooltipDelay}
                    tooltipPosition={tooltipPosition}
                    tooltipOffset={tooltipOffset}
                >
                    {this.renderContent(classNameText, classNameIcon, iconValue)}
                </Tooltip>
            );
        }

        return (
            <Button
                {...otherProps}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                theme={customTheme}
                className={updatedClassName}
                data-label={label}
                data-name={dataName}
            >
                {this.renderContent(classNameText, classNameIcon, iconValue)}
            </Button>
        );
    }

    renderContent = (
        classNameText: string,
        classNameIcon: string,
        iconValue: string,
    ): React.JSX.Element => {
        return (
            <>
                {!this.props.showOnlyIcon && (
                    <div className={classNameText}>{this.props.label}</div>
                )}

                <div className={classNameIcon}>
                    <FontIcon value={iconValue} />
                </div>
            </>
        );
    };
}
