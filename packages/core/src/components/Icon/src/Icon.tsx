import { ReactNode } from 'react';
import { getIconName, IconName, isValidIconName } from '@optimacros-ui/themes';
import { forward, styled } from '@optimacros-ui/store';
import { FontIcon } from '@optimacros-ui/font-icon';

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
    { value, rotate, size, variant, style, ...rest },
    ref,
) {
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
            <styled.svg
                width="1em"
                height="1em"
                fill="currentColor"
                {...rest}
                {...iconProps}
                ref={ref}
            >
                <use href={`#${getIconName(value as IconName)}`} />
            </styled.svg>
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
