import { ReactNode, MouseEventHandler } from 'react';
import type React from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Chip as ChipComponent } from '@optimacros-ui/chip';
import { forward } from '@optimacros-ui/store';

export type ChipTheme = {
    avatar: string;
    chip: string;
    deletable: string;
    delete: string;
    deleteIcon: string;
    deleteX: string;
};

type Props = {
    deletable?: boolean;
    onDeleteClick?: MouseEventHandler<SVGSVGElement | HTMLSpanElement>;
    settingsDialog?: React.JSX.Element;
    customDeleteIcon?: React.JSX.Element;
    style?: Record<string, any>;
    theme?: Partial<ChipTheme>;
    className?: string;
};

export type ChipProps = React.PropsWithChildren<Props>;

export const Chip = forward<ChipProps, 'div'>(
    (
        {
            children,
            className = '',
            deletable = false,
            onDeleteClick,
            settingsDialog,
            theme: customTheme = {},
            customDeleteIcon,
            theme = {},
            ...other
        },
        ref,
    ) => {
        const renderDeleteIcon = (): ReactNode => {
            if (customDeleteIcon) {
                return (
                    <span
                        data-scope="chip"
                        data-part="icon"
                        onClick={onDeleteClick}
                        className={theme.deleteIcon}
                    >
                        {customDeleteIcon}
                    </span>
                );
            }

            return (
                <ChipComponent.Icon onClick={onDeleteClick}>
                    <Icon value="cancel" className={theme.deleteIcon} />
                </ChipComponent.Icon>
            );
        };

        return (
            <ChipComponent.Root {...other} className={theme.chip} ref={ref}>
                {children}
                <div>
                    {settingsDialog && <span>{settingsDialog}</span>}
                    {deletable && renderDeleteIcon()}
                </div>
            </ChipComponent.Root>
        );
    },
);
