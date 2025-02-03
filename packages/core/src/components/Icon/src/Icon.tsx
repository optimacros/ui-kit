import { ReactNode } from 'react';
import { isValidIconName } from '@optimacros-ui/themes';
import { forward, styled } from '@optimacros-ui/store';
import { FontIcon } from '@optimacros-ui/font-icon';
import { UiKit } from '../../../store';

export interface IconProps {
    value: string | ReactNode;
    rotate?: number;
    /** as spacing variable */
    size?: string;
}

export const Icon = forward<IconProps, 'svg'>(function Icon({ value, rotate, size, ...rest }, ref) {
    const iconsSrc = UiKit.useProxySelector((state) => state.iconsSrc);

    const iconProps = {
        'data-scope': 'icon',
        'data-part': 'root',
        'data-rotate': rotate ?? undefined,
        'data-size': size ?? undefined,
        style: {
            '--rotate': `${rotate ?? 0}deg`,
            '--size': `var(--spacing-${size})`,
        } as Record<string, string>,
    };

    if (typeof value === 'string') {
        return isValidIconName(value) ? (
            <svg width="1em" height="1em" fill="currentColor" {...rest} {...iconProps} ref={ref}>
                <use href={`${iconsSrc}#${value}`} />
            </svg>
        ) : (
            //@ts-ignore
            <FontIcon {...rest} {...iconProps} value={value} ref={ref} />
        );
    }

    return (
        //@ts-ignore
        <styled.div {...rest} {...iconProps} data-tag="container" ref={ref}>
            {value}
        </styled.div>
    );
});
