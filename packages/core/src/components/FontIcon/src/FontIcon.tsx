import type React from 'react';
import { forward } from '@optimacros-ui/store';

export type FontIconProps = {
    value: string;
    className?: string;
    title?: string;
    alt?: string;
    style?: React.CSSProperties;
};

export const FontIcon = forward<FontIconProps, 'span'>((props, ref) => {
    const { alt = '', className = '', value, ...other } = props;

    return (
        <span
            {...other}
            data-react-toolbox="font-icon"
            data-scope="font-icon"
            data-part="root"
            aria-label={alt}
            className={`material-icons ${className}`}
            ref={ref}
        >
            {value}
        </span>
    );
});
