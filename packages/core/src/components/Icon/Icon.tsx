import { ICONS_MAP } from '@optimacros/icons';
import React, { SVGProps } from 'react';

import { useUiCore } from '../../store';
import { FontIcon } from '../FontIcon';

import IconStyle from './Icon.module.css';

export interface IconProps {
    // TODO: provide strong typing
    value: string | React.JSX.Element;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    title?: string;
    alt?: string;
    style?: React.CSSProperties;
}

export function Icon({ value, ...rest }: SVGProps<SVGSVGElement> & IconProps) {
    const { iconsSrc } = useUiCore();

    if (typeof value === 'string') {
        // @ts-ignore
        return ICONS_MAP[value] ? (
            <svg {...rest} data-recipe="Icon">
                <use href={`${iconsSrc}#${value}`} />
            </svg>
        ) : (
            <FontIcon {...rest} value={value} />
        );
    }

    return (
        // @ts-ignore
        <div {...rest} className={rest.className ?? IconStyle.Container}>
            {value}
        </div>
    );
}
