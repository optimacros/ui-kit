import { ReactNode } from 'react';

type VisuallyHiddenProps = {
    children: ReactNode;
    className?: string;
};

export const VisuallyHidden = ({ children, className = '' }: VisuallyHiddenProps) => {
    return (
        <span data-scope="visually-hidden" data-part="root" className={className}>
            {children}
        </span>
    );
};
