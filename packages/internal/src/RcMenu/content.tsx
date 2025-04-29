//@ts-nocheck
import BaseMenu, { Item } from 'rc-menu';
import type {
    MenuProps,
    SubMenuProps,
    MenuItemProps,
    MenuItemGroupProps,
    DividerProps,
} from 'rc-menu';
import { PureComponent } from 'react';
import { clsx, mergeStyles } from '@optimacros-ui/utils';
import { Button, ButtonTheme } from '../Button';
import { FontIcon } from '@optimacros-ui/font-icon';
import { Tooltip, TooltipProps } from '../Tooltip';
import type { KeyboardEvent, PropsWithChildren, ReactNode, JSX } from 'react';
import buttonMenuTheme from './ButtonMenu.module.css';

import './rc-menu.css';
import './rc-dropdown.css';

export { MenuItemGroup } from 'rc-menu';
export { Divider } from 'rc-menu';
export { SubMenu } from 'rc-menu';

import BaseDropDown from 'rc-dropdown';
import type { DropdownProps as RCDropdownProps } from 'rc-dropdown';

import { KEY_CODES } from '@optimacros-ui/utils';

import styles from './Dropdown.module.css';
import { ReactElement } from 'react';

export type { MenuProps, SubMenuProps, MenuItemProps, MenuItemGroupProps, DividerProps };

export const Menu = (props: MenuProps): JSX.Element => {
    return <BaseMenu selectable={false} {...props} />;
};

export const MenuItem = (props: MenuItemProps): JSX.Element => {
    return (
        <Item {...props} title={props.title || props.label}>
            {props.label || props.title || props.children}
        </Item>
    );
};

interface DropDownBaseProps extends RCDropdownProps {
    disabled?: boolean;
    closeOnSelect?: boolean;
    renderOverlay?: (props: any) => ReactElement;
}

type State = {
    visible: boolean;
    lastVisible: boolean;
};

export type DropdownProps = PropsWithChildren<DropDownBaseProps>;

export class Dropdown extends PureComponent<DropdownProps, State> {
    constructor(props: PropsWithChildren<DropDownBaseProps>) {
        super(props);

        this.state = {
            visible: props.visible ?? false,
            lastVisible: props.visible ?? false,
        };

        document.addEventListener('keydown', this.onGlobalKeyDown, true);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keydown', this.onGlobalKeyDown, true);
    }

    static getDerivedStateFromProps(
        props: PropsWithChildren<DropDownBaseProps>,
        state: State,
    ): State | null {
        const isVisible = props.visible ?? false;

        if (isVisible !== state.lastVisible) {
            return { visible: isVisible, lastVisible: isVisible };
        }

        return null;
    }

    render(): ReactNode {
        const { visible, onVisibleChange, overlay, renderOverlay, ...otherProps } = this.props;

        if (this.props.disabled) {
            return this.props.children;
        }

        const className = clsx(this.props.className, styles.Container);
        const overlayClassName = clsx(this.props.overlayClassName, 'wg-dropdown');

        return (
            <div className={className} onKeyDown={this.onKeyDown}>
                <BaseDropDown
                    visible={this.state.visible}
                    onVisibleChange={this.onVisibleChange}
                    onOverlayClick={this.onOverlayClick}
                    overlay={overlay ?? renderOverlay?.(otherProps)}
                    {...otherProps}
                    destroyPopupOnHide
                    overlayClassName={overlayClassName}
                />
            </div>
        );
    }

    private onVisibleChange = (visible: boolean): void => {
        if (this.props.onVisibleChange) {
            this.props.onVisibleChange(visible);
        }

        this.setState({ visible });
    };

    private onOverlayClick = () => {
        if (this.props.closeOnSelect !== false) {
            this.onVisibleChange(false);
        }
    };

    private onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!this.state.visible && event.keyCode === KEY_CODES.SPACE) {
            event.preventDefault();
            event.stopPropagation();

            this.onVisibleChange(!this.state.visible);
        }
    };

    private onGlobalKeyDown = (event: KeyboardEvent): void => {
        if (this.state.visible && event.keyCode === KEY_CODES.ESC) {
            this.onVisibleChange(false);
        }
    };
}

export type ButtonMenuTheme = Partial<ButtonTheme>;

export type ButtonMenuBaseProps = {
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
    icon?: string | JSX.Element;
    dataName?: string;
    classNameDropdownContainer?: string;
    closeOnSelect?: boolean;
} & Partial<TooltipProps>;

export type ButtonMenuProps = PropsWithChildren<ButtonMenuBaseProps>;

export class ButtonMenu extends PureComponent<ButtonMenuProps> {
    render(): JSX.Element {
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

    renderMenu(): JSX.Element {
        const { menuRootContainerClassName } = this.props;
        const theme = mergeStyles(this.props.theme, buttonMenuTheme);
        const className = clsx(menuRootContainerClassName, theme.MenuRootContainerClassName);

        return <Menu className={className}>{this.props.children}</Menu>;
    }

    renderButton(): JSX.Element {
        const {
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            tooltipDelay,
            tooltipPosition,
            tooltipOffset,
            theme = {},
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
            children,
            ...otherProps
        } = this.props;

        const customTheme = mergeStyles(theme, buttonMenuTheme);

        const updatedClassName = clsx(
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
                        className: updatedClassName,
                    }}
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
    ): JSX.Element => {
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
