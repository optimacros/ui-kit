import { forwardRef } from 'react';
import type React from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Button, ButtonTheme, MenuTrigger, Menu } from '@optimacros-ui/kit-internal';
import { Tooltip, TooltipProps } from '@optimacros-ui/kit-internal';

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
} & Partial<TooltipProps>;

export type ButtonMenuProps = React.PropsWithChildren<Props>;

export const ButtonMenu = forwardRef<HTMLButtonElement, ButtonMenuProps>((props, ref) => {
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
        ...otherProps
    } = props;

    const renderButton = () => {
        const iconValue = arrowUp ? 'arrow_drop_up' : 'arrow_drop_down';
        const renderContent = () => {
            return (
                <>
                    {!showOnlyIcon && <div className={theme.buttonText}>{label}</div>}
                    <div className={theme.buttonIcon}>
                        <Icon value={iconValue} />
                    </div>
                </>
            );
        };

        if (tooltip) {
            return (
                <Tooltip
                    composedComponent={Button}
                    composedComponentProps={{
                        theme,
                        className: theme.ButtonMenu,
                        ...otherProps,
                        'data-label': label,
                        'data-name': dataName,
                    }}
                    theme={theme}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    tooltip={tooltip}
                    tooltipDelay={tooltipDelay}
                    tooltipPosition={tooltipPosition}
                    tooltipOffset={tooltipOffset}
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
                className={theme.ButtonMenu}
                disabled={disabled}
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
            renderTrigger={() => <MenuTrigger as="div">{renderButton()}</MenuTrigger>}
            onOpenChange={(state) => onVisibleChange && onVisibleChange(state.open)}
            ref={ref}
        >
            {children}
        </Menu>
    );
});
