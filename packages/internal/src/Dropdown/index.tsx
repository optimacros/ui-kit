import { forwardRef, ReactElement, useEffect } from 'react';
import type React from 'react';
import { Menu } from '@optimacros-ui/menu';
import type { DropdownProps as RCDropdownProps } from '../../node_modules/rc-dropdown/lib';
import { MenuProps } from '../Menu';
import { styled } from '@optimacros-ui/store';

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

        // Зачем обнуляем контент при смене visible
        // Во-1х, а в чем смысл его существования?
        // Во-2х, тесты в сценарии выбора пункта в меню ждут появления-пропадания лоадера над меню. При первом открытии дропдауна с меню, все данные загружаются и сохраняются. При последующих открытиях, лоадер не появляется (данные-то есть) = тест не видит лоадер = фейл
        const content = (open: boolean) => (
            <>
                <Menu.Trigger as="div" data-testid="dropdown-trigger">
                    {children}
                </Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content className="dropdown" data-testid="dropdown-content">
                        {open ? <>{renderOverlay?.({ onlyContent: true }) ?? overlay}</> : null}
                    </Menu.Content>
                </Menu.Positioner>
            </>
        );

        return (
            <Menu.Root {...otherProps} open={visible} onOpenChange={handleVisibleChange} hoverable>
                <styled.div
                    ref={ref}
                    data-scope="menu"
                    data-part="container"
                    data-testid="dropdown-container"
                >
                    <Menu.Api>
                        {(api) => {
                            return isHoverTrigger ? (
                                <styled.div
                                    style={{ width: 'fit-content' }}
                                    onMouseEnter={() => handleMouseEnter(api)}
                                    onMouseLeave={(e) => handleMouseLeave(e, api)}
                                    data-testid="dropdown-hover"
                                >
                                    {content(api.open)}
                                </styled.div>
                            ) : (
                                content(api.open)
                            );
                        }}
                    </Menu.Api>
                </styled.div>
            </Menu.Root>
        );
    },
);
