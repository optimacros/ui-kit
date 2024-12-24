import { SVGProps, ReactNode } from 'react';
import { isValidIconName } from '@optimacros-ui/themes';
import { styled } from '@optimacros-ui/store';
import { FontIcon } from '@optimacros-ui/font-icon';
import { useUiCore } from '../../../store';

export interface IconProps {
    value: string | ReactNode;
    rotate?: number;
}

export function Icon({ value, rotate, ...rest }: SVGProps<SVGSVGElement> & IconProps) {
    const { iconsSrc } = useUiCore();

    const iconProps = {
        'data-scope': 'icon',
        'data-part': 'root',
        'data-rotate': rotate ?? undefined,
        style: {
            '--rotate': `${rotate ?? 0}deg`,
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
