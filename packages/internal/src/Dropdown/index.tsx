import React, { useEffect } from 'react';
import { Menu } from '@optimacros-ui/kit';
import type { DropdownProps as RCDropdownProps } from 'rc-dropdown';

interface Props extends RCDropdownProps {
    disabled?: boolean;
    closeOnSelect?: boolean;
}

export type DropdownProps = React.PropsWithChildren<Props>;

export const Dropdown = ({
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
}: DropdownProps) => {
    let closeTimeout;

    useEffect(() => {
        return clearTimeout(closeTimeout);
    }, []);

    if (disabled) {
        return <>{children}</>;
    }

    const handleVisibleChange = ({ open }: { open: boolean }) => {
        if (onVisibleChange) {
            onVisibleChange(open);
        }
    };

    const handleMouseEnter = (api) => {
        clearTimeout(closeTimeout);
        api.setOpen(true);
    };

    const handleMouseLeave = (e, api) => {
        closeTimeout = setTimeout(() => {
            const cursorX = e.clientX;
            const cursorY = e.clientY;

            const elementUnderCursor = document.elementFromPoint(cursorX, cursorY);

            const isInMenu =
                elementUnderCursor && elementUnderCursor.closest('[data-scope="menu"]');

            if (!isInMenu) {
                api.setOpen(false);
            }
        }, 120);
    };

    const isHoverTrigger = trigger[0] === 'hover';
    const isMenuInOverlay = overlay?.type?.name === 'Menu';

    return (
        <Menu.Root
            {...otherProps}
            open={visible}
            onOpenChange={handleVisibleChange}
            isHoverTrigger={isHoverTrigger}
        >
            {(api) => {
                return isHoverTrigger ? (
                    <div
                        style={{ width: 'fit-content' }}
                        onMouseEnter={() => handleMouseEnter(api)}
                        onMouseLeave={(e) => handleMouseLeave(e, api)}
                    >
                        <Menu.Trigger asChild>
                            <div>{children}</div>
                        </Menu.Trigger>
                        <Menu.Positioner>
                            <Menu.Content size="sm">
                                <Menu.List>{overlay}</Menu.List>
                            </Menu.Content>
                        </Menu.Positioner>
                    </div>
                ) : (
                    <>
                        <Menu.Trigger asChild>
                            <div>{children}</div>
                        </Menu.Trigger>
                        <Menu.Positioner>
                            <Menu.Content size="sm">
                                <Menu.List>
                                    {isMenuInOverlay ? overlay?.props?.children : overlay}
                                </Menu.List>
                            </Menu.Content>
                        </Menu.Positioner>
                    </>
                );
            }}
        </Menu.Root>
    );
};
