import { ReactNode } from 'react';

// Types
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface BadgeProps {
    /** The content to display inside the badge */
    count?: number;
    /** Badge position relative to the child element */
    position?: BadgePosition;
    /** Custom offset value in pixels */
    offset?: number;
    /** The element to wrap with the badge */
    children: ReactNode;
    /** any size as css value */
    size: string;
    style: object;
    className?: string;
}

export const Badge = ({
    children,
    count,
    position = 'top-right',
    offset,
    style = {},
    className,
    size,
}: BadgeProps) => {
    const showBadge = count !== undefined && count > 0;

    const rootStyle =
        offset || size
            ? {
                  ...style,
                  '--size': size,
                  '--badge-offset':
                      offset < 0
                          ? `calc(var(--spacing-${offset * -1}) * -1)`
                          : `var(--spacing-${offset})`,
              }
            : style;

    return (
        <div data-scope="badge" data-part="root" style={rootStyle} className={className}>
            {children}
            {showBadge && (
                <div data-scope="badge" data-part="badge" data-position={position}>
                    {count > 99 ? '99+' : count}
                </div>
            )}
        </div>
    );
};
