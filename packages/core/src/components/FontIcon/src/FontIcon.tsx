import React from 'react';
import { forward } from '@optimacros-ui/store';

export type FontIconProps = {
    value: string | React.JSX.Element;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
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
            aria-label={alt}
            className={`material-icons ${className}`}
            ref={ref}
        >
            {value}
        </span>
    );
});
