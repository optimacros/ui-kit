import type { ReactNode } from 'react';

import { clsx, tw } from '@optimacros/ui-kit-utils';

export interface ButtonThemeProps {
    variant?: 'primary' | 'accent' | 'bordered' | 'neutral';
    float?: 'raised' | 'floating' | 'flat';
    status?: 'warning' | 'error' | 'success';
    size?: 'xs' | 'md';
    squared?: boolean;
    uppercase?: boolean;
    inverse?: boolean;
}

interface ButtonProps extends ButtonThemeProps {
    disabled?: boolean;
    className?: string;
    href?: string;
    target?: string;
    children?: ReactNode;
    renderIcon?: () => ReactNode;
}

const buttonCn = tw`
gap-1.5 leading-normal inline-flex items-center justify-center font-normal text-button border-1 border-solid border-transparent
normal-case data-[uppercase="true"]:uppercase px-3
rounded-button cursor-pointer tracking-normal relative text-center whitespace-nowrap box-border flex-row
`;

export const Button = (props: ButtonProps) => {
    const {
        disabled,
        renderIcon,
        variant,
        size,
        float,
        inverse,
        status,
        href,
        children,
        uppercase,
        className,
        squared,
        ...rest
    } = props;

    const elementProps = {
        ...rest,
        disabled,
        'data-variant': variant ?? 'neutral',
        'data-size': size ?? 'md',
        'data-float': float ?? 'flat',
        'data-inverse': inverse,
        'data-recipe': 'Button',
        'data-uppercase': uppercase,
        'data-status': status,
        'data-squared': squared,
        children: (
            <>
                {renderIcon?.()}
                {children}
            </>
        ),
        className: clsx(buttonCn, className),
    };

    const buttonElement = href ? <a href={href} {...elementProps} /> : <button {...elementProps} />;

    if (disabled) {
        return <span>{buttonElement}</span>;
    }

    return buttonElement;
};
