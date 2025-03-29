import { ReactNode, MouseEventHandler } from 'react';
import type React from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Chip as ChipComponent } from '@optimacros-ui/chip';
import { forward } from '@optimacros-ui/store';
import { clsx } from '@optimacros-ui/utils';

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
    /** TODO remove */
    incomeDeleteIcon?: React.JSX.Element;
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
            incomeDeleteIcon,
            theme = {},
            style,
            ...other
        },
        ref,
    ) => {
        const renderDeleteIcon = (): ReactNode => {
            if (customDeleteIcon || incomeDeleteIcon) {
                return (
                    <span
                        data-scope="chip"
                        data-part="icon"
                        onClick={onDeleteClick}
                        className={theme.deleteIcon}
                    >
                        {customDeleteIcon || incomeDeleteIcon}
                    </span>
                );
            }

            return (
                <ChipComponent.Icon onClick={onDeleteClick}>
                    <Icon value="cancel" className={theme.deleteIcon} />
                </ChipComponent.Icon>
            );
        };

        const cn = clsx(className, theme.chip);

        const hasBorderStyle = cn.includes('ListChipElements-module__ChipRow_Chips___udesG');

        return (
            <ChipComponent.Root
                {...other}
                className={cn}
                ref={ref}
                style={{ ...style, ...(hasBorderStyle ? { borderRadius: 2 } : null) }}
            >
                {children}
                <div>
                    {settingsDialog && <span>{settingsDialog}</span>}
                    {deletable && renderDeleteIcon()}
                </div>
            </ChipComponent.Root>
        );
    },
);
