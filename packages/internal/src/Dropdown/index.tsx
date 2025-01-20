import React, { useId } from 'react';
import { Menu } from '@optimacros-ui/menu';
import type { DropdownProps as RCDropdownProps } from 'rc-dropdown';

interface Props extends RCDropdownProps {
    disabled?: boolean;
    closeOnSelect?: boolean;
}

export type DropdownProps = React.PropsWithChildren<Props>;

export const MenuItem = ({ label, value, title, children, onClick, ...restProps }) => {
    const generatedKey = useId();

    return (
        <div onClick={onClick}>
            <Menu.Item
                {...restProps}
                valueText={label || title || children}
                value={value || generatedKey}
            />
        </div>
    );
};

export const Dropdown: DropdownProps = ({
    visible: propVisible = false,
    onVisibleChange,
    closeOnSelect = true,
    disabled,
    className,
    overlayClassName,
    children,
    overlay,
    visible,
    trigger,
    ...otherProps
}) => {
    const handleVisibleChange = ({ open }: { open: boolean }) => {
        if (onVisibleChange) {
            onVisibleChange(open);
        }
    };

    if (disabled) {
        return <>{children}</>;
    }

    return (
        <Menu.Root {...otherProps} open={visible} onOpenChange={handleVisibleChange}>
            <Menu.Trigger asChild>{children}</Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content size="sm">
                    <Menu.List>{overlay}</Menu.List>
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
};
