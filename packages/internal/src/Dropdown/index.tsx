//@ts-nocheck

import React, { useEffect } from 'react';
import { Menu } from '@optimacros-ui/menu';
import type { DropdownProps as RCDropdownProps } from 'rc-dropdown';
import { forward } from '@optimacros-ui/store';

interface Props extends RCDropdownProps {
    disabled?: boolean;
    closeOnSelect?: boolean;
    controllable?: boolean;
    className?: string;
}

export type DropdownProps = React.PropsWithChildren<Props>;

export const Dropdown = forward<DropdownProps, 'div'>(
    (
        {
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
        },
        ref,
    ) => {
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

        //@ts-ignore
        const isMenuInOverlay = overlay?.type?.name === 'Menu';

        return (
            <Menu.Root
                {...otherProps}
                ref={ref}
                open={visible}
                onOpenChange={handleVisibleChange}
                hoverable={isHoverTrigger}
            >
                <Menu.Api>
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
                                        {/** @ts-ignore */}
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
                                            {isMenuInOverlay
                                                ? //@ts-ignore
                                                  overlay?.props?.children
                                                : overlay}
                                        </Menu.List>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </>
                        );
                    }}
                </Menu.Api>
            </Menu.Root>
        );
    },
);
