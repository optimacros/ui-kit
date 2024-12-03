import type { PropsWithChildren } from 'react';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export const footerClassName = tw`w-full min-h-5 flex flex-row items-center space-x-4 px-3 py-1 text-xs box-border

text-[var(--text)] bg-[var(--bg)]`;

export interface FooterProps extends PropsWithChildren {
    appVersion?: string;
    copyright?: string;
}

export const Root = forward<FooterProps, 'div'>(
    ({ appVersion, copyright, children, ...rest }, ref) => {
        return (
            <styled.footer
                {...rest}
                className={footerClassName}
                ref={ref}
                data-scope="footer"
                data-part="root"
            >
                {children}
            </styled.footer>
        );
    },
    { displayName: 'FooterRoot' },
);

export const leftColClassName = tw`flex items-center space-x-1`;

export const LeftCol = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.div
                {...rest}
                className={leftColClassName}
                ref={ref}
                data-scope="footer"
                data-part="left-col"
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'LeftCol' },
);

export const versionClassName = tw`font-bold`;

export const Version = forward<PropsWithChildren, 'span'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.span
                {...rest}
                ref={ref}
                className={versionClassName}
                data-scope="footer"
                data-part="version"
            >
                {children}
            </styled.span>
        );
    },
    { displayName: 'Version' },
);

export const Copyright = forward<PropsWithChildren, 'span'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.span {...rest} ref={ref} data-scope="footer" data-part="copyright">
                {children}
            </styled.span>
        );
    },
    { displayName: 'Copyright' },
);

export const contentClassName = tw`flex grow-1 flex-row justify-end`;

export const Content = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.div
                {...rest}
                ref={ref}
                className={contentClassName}
                data-scope="footer"
                data-part="content"
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'Content' },
);
