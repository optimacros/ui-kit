import type { PropsWithChildren } from 'react';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export const footerClassName = tw`w-full min-h-5 flex flex-row items-center space-x-4 px-3 py-1 text-xs box-border

text-[var(--text)] bg-[var(--bg)]`;

export const footerLeftClassName = tw`flex items-center space-x-1`;

export const footerRightClassName = tw`flex grow-1 flex-row justify-end`;

export const versionClassName = tw`font-bold`;

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
                <styled.div className={footerLeftClassName} data-scope="footer" data-part="info">
                    <span className={versionClassName} data-scope="footer" data-part="version">
                        {appVersion}
                    </span>

                    <span data-scope="footer" data-part="copyright">
                        {copyright}
                    </span>
                </styled.div>

                <styled.div
                    className={footerRightClassName}
                    data-scope="footer"
                    data-part="content"
                >
                    {children}
                </styled.div>
            </styled.footer>
        );
    },
    { displayName: 'FooterRoot' },
);
