import React from 'react';
import { Button, ButtonTheme } from '../Button';
import { Icon } from '@optimacros-ui/icon';
import { Tooltip, TooltipProps } from '../Tooltip';

export type ButtonMenuTheme = Partial<ButtonTheme>;

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

export const WSButtonMenu: React.FC<ButtonMenuProps> = (props) => {
    const {
        disabled,
        onVisibleChange,
        visible,
        classNameDropdownContainer,
        closeOnSelect,
        menuRootContainerClassName,
        theme,
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
        const content = renderContent(iconValue);

        if (tooltip) {
            return (
                <Tooltip
                    composedComponent={Button}
                    composedComponentProps={{
                        ...otherProps,
                        'data-label': label,
                        'data-name': dataName,
                    }}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    tooltip={tooltip}
                    tooltipDelay={tooltipDelay}
                    tooltipPosition={tooltipPosition}
                    tooltipOffset={tooltipOffset}
                >
                    {content}
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
            >
                {content}
            </Button>
        );
    };

    const renderContent = (iconValue: string) => {
        return (
            <>
                {!showOnlyIcon && <div>{label}</div>}
                <div>
                    <Icon value={iconValue} />
                </div>
            </>
        );
    };

    return (
        <div>d</div>
        // <Menu.Root closeOnSelect={closeOnSelect} {...props}>
        //     <Menu.Positioner>
        //         <Menu.Content size="sm">{children}</Menu.Content>
        //     </Menu.Positioner>
        // </Menu.Root>
        // <Dropdown
        //     overlay={renderMenu()}
        //     trigger={['click']}
        //     disabled={disabled}
        //     onVisibleChange={onVisibleChange}
        //     visible={visible}
        //     className={classNameDropdownContainer}
        //     closeOnSelect={closeOnSelect}
        // >
        //     {renderButton()}
        // </Dropdown>
    );
};
