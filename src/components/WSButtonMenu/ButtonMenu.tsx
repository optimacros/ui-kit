// @ts-nocheck
import classNames from 'classnames'
import { PureComponent } from 'react'
import { FontIcon, Tooltip } from 'ui-kit-core'

import { mergeStyles } from '../../utils'
import { Menu } from '../Menu'
import { WSButton as Button } from '../WSButton'
import { WSDropdown as Dropdown } from '../WSDropdown'

import styles from './ButtonMenu.module.css'

interface Props {
    label: string;
    disabled?: boolean;
    className?: string;
    uppercase?: boolean;
    showOnlyIcon?: boolean;
    tooltip?: string;
    arrowUp?: boolean;
    onVisibleChange?: () => void;
    visible?: boolean;
    theme?: Record<string, string>;
    icon?: string;
    dataName?: string;
    menuRootContainerClassName?: string;
		children: any;
}

export class WSButtonMenu extends PureComponent<Props> {
    render() {
        return (
            <Dropdown
                disabled={this.props.disabled}
                overlay={this.renderMenu()}
                trigger={['click']}
                visible={this.props.visible}
                onVisibleChange={this.props.onVisibleChange}
            >
                {this.renderButton()}
            </Dropdown>
        )
    }

    renderMenu() {
        const { menuRootContainerClassName } = this.props
        const theme = mergeStyles(this.props.theme, styles)
        const className = classNames(menuRootContainerClassName, theme.MenuRootContainerClassName)

        return <Menu className={className}>{this.props.children}</Menu>
    }

    renderButton() {
        const TooltipButton = this.props.tooltip
            ? props => (
                <Tooltip
                    {...props}
                    composedComponent={Button}
                />
            )
            : Button
        const theme = mergeStyles(this.props.theme, styles)
        const className = classNames(
            {
                [styles.ButtonMenu]: true,
                [styles.ButtonMenu__uppercase]: this.props.uppercase,
                [styles.ButtonMenu__showOnlyIcon]: this.props.showOnlyIcon,
            },
            this.props.className,
            theme.ButtonMenu,
        )

        const classNameText = classNames(styles.buttonText, theme.buttonText)
        const classNameIcon = classNames(styles.buttonIcon, theme.buttonIcon)
        const iconValue = this.props.arrowUp
            ? 'arrow_drop_up'
            : 'arrow_drop_down'

        return (
            <TooltipButton
                className={className}
                data-label={this.props.label}
                data-name={this.props.dataName}
                disabled={this.props.disabled}
                icon={this.props.icon}
                theme={this.props.theme}
                tooltip={this.props.tooltip}
            >
                {!this.props.showOnlyIcon && (
                    <div className={classNameText}>{this.props.label}</div>
                )}

                <div className={classNameIcon}>
                    <FontIcon value={iconValue} />
                </div>
            </TooltipButton>
        )
    }
}
