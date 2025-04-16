import { forwardRef } from 'react';
import type React from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Button, ButtonTheme, MenuTrigger, Menu, MenuProps } from '@optimacros-ui/kit-internal';
import { Tooltip, TooltipProps } from '@optimacros-ui/kit-internal';
import { clsx } from '@optimacros-ui/utils';
import './styles.css';
import { styled } from '@optimacros-ui/store';

export type ButtonMenuTheme = Partial<ButtonTheme> & {
    ButtonMenu?: string;
    buttonText?: string;
    buttonIcon?: string;
};

type Props = {
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
    portalled?: boolean;
    positioning?: MenuProps['positioning'];
} & Partial<TooltipProps>;

export type ButtonMenuProps = React.PropsWithChildren<Props>;

export const ButtonMenu = forwardRef<HTMLDivElement, ButtonMenuProps>((props, ref) => {
    const {
        disabled,
        onVisibleChange,
        visible,
        classNameDropdownContainer,
        closeOnSelect,
        menuRootContainerClassName,
        theme = {},
        children,
        onClick,
        onMouseEnter,
        onMouseLeave,
        tooltip,
        tooltipDelay,
        tooltipPosition,
        tooltipOffset,
        showOnlyIcon,
        arrowUp,
        dataName,
        label,
        uppercase,
        className,
        portalled,
        positioning,
        ...otherProps
    } = props;

    const btnClassName = clsx(theme.ButtonMenu, className);

    const renderButton = () => {
        const iconValue = arrowUp ? 'arrow_drop_up' : 'arrow_drop_down';
        const renderContent = () => {
            return (
                <>
                    {!showOnlyIcon && (
                        <styled.div
                            className={theme.buttonText}
                            data-testid="button-menu-button-label"
                        >
                            {label}
                        </styled.div>
                    )}
                    <styled.div
                        className={theme.buttonIcon}
                        data-testid="button-menu-button-icon-wrap"
                    >
                        <Icon value={iconValue} />
                    </styled.div>
                </>
            );
        };

        if (tooltip) {
            return (
                <Tooltip
                    composedComponent={Button}
                    composedComponentProps={{
                        theme,
                        className: btnClassName,
                        ...otherProps,
                        'data-label': label,
                        'data-name': dataName,
                        'data-tag': 'button-menu',
                        disabled: disabled,
                        'data-testid': 'button-menu-button',
                    }}
                    theme={theme}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    tooltip={tooltip}
                    tooltipDelay={tooltipDelay}
                    tooltipPosition={tooltipPosition}
                    tooltipOffset={tooltipOffset}
                    data-testid="button-menu-tooltip"
                >
                    {renderContent()}
                </Tooltip>
            );
        }

        return (
            <Button
                {...otherProps}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                data-label={label}
                data-name={dataName}
                theme={theme}
                className={btnClassName}
                disabled={disabled}
                data-tag="button-menu"
                data-testid="button-menu-button"
            >
                {renderContent()}
            </Button>
        );
    };

    return (
        <Menu
            closeOnSelect={closeOnSelect}
            disabled={disabled}
            open={visible}
            renderTrigger={() => (
                <MenuTrigger as="div" data-testid="button-menu-trigger">
                    {renderButton()}
                </MenuTrigger>
            )}
            onOpenChange={(state) => onVisibleChange && onVisibleChange(state.open)}
            ref={ref}
            portalled={portalled}
            positioning={positioning}
            contentClassName={
                visible && dataName === 'visualObjects' ? 'ContextMenu-module__Container' : null
            }
            data-testid="button-menu"
        >
            {children}
        </Menu>
    );
});
