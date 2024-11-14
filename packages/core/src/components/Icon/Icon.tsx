import { isValidIconName } from '@optimacros/themes';
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
        return isValidIconName(value) ? (
            <svg width="1em" height="1em" fill="currentColor" {...rest} data-scope="icon">
                <use href={`${iconsSrc}#${value}`} />
            </svg>
        ) : (
            <FontIcon {...rest} value={value} data-scope="icon" />
        );
    }

    return (
        // @ts-ignore
        <div {...rest} className={rest.className ?? IconStyle.Container} data-scope="icon">
            {value}
        </div>
    );
}
