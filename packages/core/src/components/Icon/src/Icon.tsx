import { ReactNode } from 'react';
import { isValidIconName } from '@optimacros-ui/themes';
import { forward, styled } from '@optimacros-ui/store';
import { FontIcon } from '@optimacros-ui/font-icon';
import { UiKit } from '@optimacros-ui/kit-store';
import { iconValueParser } from '@optimacros-ui/kit-internal';

export interface IconProps {
    value: string | ReactNode;
    rotate?: number;
    /** as spacing variable */
    size?: string;
    variant?: 'primary' | 'secondary';
    /** color as variable */
    color?: string;
    className?: string;
}

export const Icon = forward<IconProps, 'svg'>(function Icon(
    { value: valueProp, rotate, size, variant, style, ...rest },
    ref,
) {
    // TODO remove
    const value = iconValueParser(valueProp);

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
            ...(size ? { '--size': `var(--spacing-${size})` } : null),
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
