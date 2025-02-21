import React from 'react';
import classnames from 'classnames';

interface FontIconProps {
    alt?: string;
    children?: React.ReactNode;
    className?: string;
    value: string | React.ReactNode;
    // note: Нужен только для предотвращения попадания свойства theme в node
    theme?: Record<string, string>;
}

const FontIcon = ({
    alt = '',
    children,
    className = '',
    theme,
    value,
    ...other
}: FontIconProps) => {
    const classNameIcon = classnames(
        {
            'material-icons': typeof value === 'string' || typeof children === 'string',
        },
        className,
    );

    return (
        <span data-react-toolbox="font-icon" aria-label={alt} className={classNameIcon} {...other}>
            {value}
            {children}
        </span>
    );
};

export default FontIcon;
export { FontIcon };
