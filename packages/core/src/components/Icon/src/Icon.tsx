import { SVGProps, ReactNode } from 'react';
import { isValidIconName } from '@optimacros-ui/themes';
import { styled } from '@optimacros-ui/store';
import { FontIcon } from '@optimacros-ui/font-icon';
import { UiKit } from '../../../store';

export interface IconProps {
    value: string | ReactNode;
    rotate?: number;
    /** as spacing variable */
    size?: string;
    variant?: 'primary' | 'secondary';
    /** color as variable */
    color?: string;
}

export function Icon({
    value,
    rotate,
    size,
    style,
    variant,
    ...rest
}: SVGProps<SVGSVGElement> & IconProps) {
    const iconsSrc = UiKit.useProxySelector((state) => state.iconsSrc);

    const iconProps = {
        'data-scope': 'icon',
        'data-part': 'root',
        'data-rotate': rotate ?? undefined,
        'data-size': size ?? undefined,
        'data-variant': variant,
        style: {
            ...(style && style),
            '--rotate': `${rotate ?? 0}deg`,
            '--size': `var(--spacing-${size})`,
        },
    };

    if (typeof value === 'string') {
        return isValidIconName(value) ? (
            <svg width="1em" height="1em" fill="currentColor" {...rest} {...iconProps}>
                <use href={`${iconsSrc}#${value}`} />
            </svg>
        ) : (
            <FontIcon {...rest} {...iconProps} value={value} />
        );
    }

    return (
        //@ts-ignore
        <styled.div {...rest} {...iconProps} data-tag="container">
            {value}
        </styled.div>
    );
}
