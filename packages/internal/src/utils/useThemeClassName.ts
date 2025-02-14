import { clsx } from '@optimacros-ui/utils';
import { useMemo } from 'react';

export function useThemeClassName(theme: object, className: string) {
    const cn = useMemo(
        () => (theme ? clsx(...Object.values(theme), className) : className),
        [theme, className],
    );
    return cn;
}
