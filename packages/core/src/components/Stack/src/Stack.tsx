// Stack.tsx
import { ReactNode } from 'react';

type StackProps = {
    children: ReactNode;
    gap?: string;
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    wrap?: boolean;
    className?: string;
};

export const Root = ({
    children,
    gap = '0',
    align = 'start',
    justify = 'start',
    wrap = false,
    className = '',
}: StackProps) => {
    return (
        <div
            data-scope="stack"
            data-part="root"
            data-align={align}
            data-justify={justify}
            data-wrap={wrap}
            style={{
                gap: `var(--spacing-${gap})`,
            }}
            className={className}
        >
            {children}
        </div>
    );
};

export const Horizontal = (props: StackProps) => {
    return <Root data-orientation="horizontal" {...props} />;
};

export const Vertical = (props: StackProps) => {
    return <Root data-orientation="vertical" {...props} />;
};
