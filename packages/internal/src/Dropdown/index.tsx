import { forwardRef, ReactElement, useEffect, useRef } from 'react';
import type React from 'react';
import { Menu } from '@optimacros-ui/menu';
import type { DropdownProps as RCDropdownProps } from 'rc-dropdown';
import { MenuProps } from '../Menu';

interface Props extends RCDropdownProps {
    disabled?: boolean;
    closeOnSelect?: boolean;
    controllable?: boolean;
    className?: string;
    renderOverlay?: (props: Partial<MenuProps>) => ReactElement;
    overlay?: ReactElement;
}

export type DropdownProps = React.PropsWithChildren<Props>;

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
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
            renderOverlay,
            ...otherProps
        },
        ref,
    ) => {
        let closeTimeout;
        const menuRef = useRef<HTMLDivElement>(null);

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

        const content = (
            <>
                <Menu.Trigger as="div">{children}</Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content>{renderOverlay?.({ onlyContent: true }) ?? overlay}</Menu.Content>
                </Menu.Positioner>
            </>
        );

        return (
            <Menu.Root {...otherProps} open={visible} onOpenChange={handleVisibleChange} hoverable>
                <div ref={menuRef} data-scope="menu" data-part="root">
                    <Menu.Api>
                        {(api) => {
                            return isHoverTrigger ? (
                                <div
                                    style={{ width: 'fit-content' }}
                                    onMouseEnter={() => handleMouseEnter(api)}
                                    onMouseLeave={(e) => handleMouseLeave(e, api)}
                                >
                                    {content}
                                </div>
                            ) : (
                                content
                            );
                        }}
                    </Menu.Api>
                </div>
            </Menu.Root>
        );
    },
);
