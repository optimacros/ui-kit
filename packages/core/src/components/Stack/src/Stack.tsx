import { forward, styled } from '@optimacros-ui/store';
import { ComponentProps, forwardRef } from 'react';

type StackProps = {
    gap?: string;
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    wrap?: boolean;
};

type RootProps = ComponentProps<typeof Root>;

export const Root = forward<StackProps, 'div'>(
    (
        { children, gap = '0', align = 'start', justify = 'start', wrap = false, style, ...rest },
        ref,
    ) => {
        return (
            <styled.div
                data-scope="stack"
                data-part="root"
                data-align={align}
                data-justify={justify}
                data-wrap={wrap}
                style={{
                    gap: `var(--spacing-${gap})`,
                    ...style,
                }}
                {...rest}
                ref={ref}
            >
                {children}
            </styled.div>
        );
    },
    {
        displayName: 'Stack',
    },
);

export const Horizontal = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
    return <Root data-orientation="horizontal" {...props} ref={ref} />;
});

export const Vertical = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
    return <Root data-orientation="vertical" {...props} ref={ref} />;
});
