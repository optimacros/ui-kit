import type { ReactNode } from 'react';

import { clsx, tw } from '@optimacros/ui-kit-utils';

export interface ButtonThemeProps {
    variant?: 'primary' | 'accent' | 'bordered' | 'neutral' | 'transparent';
    float?: 'raised' | 'floating' | 'flat';
    status?: 'warning' | 'error' | 'success';
    size?: 'xs' | 'md';
    squared?: boolean;
    uppercase?: boolean;
    inverse?: boolean;
}

export interface ButtonProps extends ButtonThemeProps {
    disabled?: boolean;
    className?: string;
    href?: string;
    target?: string;
    children?: ReactNode;
    renderIcon?: () => ReactNode;
}

const buttonCn = tw`
gap-1.5 leading-normal inline-flex items-center justify-center font-normal text-button
rounded-button cursor-pointer tracking-normal relative text-center whitespace-nowrap box-border flex-row
normal-case data-[uppercase="true"]:uppercase px-3 select-none

border-1 border-solid border-[var(--border)] hover:border-[var(--border-hover)]
outline-[var(--outline-color)] outline-solid outline-offset-[-4px] outline-1

text-[var(--text)] hover:text-[var(--text-hover)] focus-visible:text-[var(--text-focus)] 
bg-[var(--bg)] hover:bg-[var(--bg-hover)]  focus-visible:bg-[var(--bg-focus)]
shadow-[var(--shadow)] focus-visible:shadow-[var(--shadow-focus)]

disabled:pointer-events-none disabled:cursor-auto
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
        'data-scope': 'button',
        'data-part': 'root',
        'data-uppercase': uppercase,
        'data-status': status,
        'data-squared': squared,
        'data-tag': props['data-tag'] ?? 'button',
        children: (
            <>
                {renderIcon?.()}
                {children}
            </>
        ),
        className: clsx(buttonCn, className),
    };

    return href ? <a href={href} {...elementProps} /> : <button {...elementProps} />;
};
