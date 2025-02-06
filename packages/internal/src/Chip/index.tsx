//@ts-nocheck

import { Icon } from '@optimacros-ui/icon';
import { Chip as ChipComponent } from '@optimacros-ui/chip';
import React, { ReactNode, MouseEventHandler } from 'react';

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
};

export type ChipProps = React.PropsWithChildren<Props>;

export const Chip = ({
    children,
    className = '',
    deletable = false,
    onDeleteClick,
    settingsDialog,
    theme: customTheme = {},
    customDeleteIcon,
    ...other
}: ChipProps) => {
    const renderDeleteIcon = (): ReactNode => {
        if (customDeleteIcon) {
            return (
                <span data-scope="chip" data-part="icon" onClick={onDeleteClick}>
                    {customDeleteIcon}
                </span>
            );
        }

        return (
            <ChipComponent.Icon onClick={onDeleteClick}>
                <Icon value="cancel" />
            </ChipComponent.Icon>
        );
    };

    return (
        <ChipComponent.Root {...other}>
            {children}
            <div>
                {settingsDialog && <span>{settingsDialog}</span>}
                {deletable && renderDeleteIcon()}
            </div>
        </ChipComponent.Root>
    );
};
