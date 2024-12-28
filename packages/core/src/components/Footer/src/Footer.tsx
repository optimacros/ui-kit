import type { PropsWithChildren } from 'react';
import { forward, styled } from '@optimacros-ui/store';

export const Root = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        return <styled.footer {...props} ref={ref} data-scope="footer" data-part="root" />;
    },
    { displayName: 'FooterRoot' },
);

export const LeftCol = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        return <styled.div {...props} ref={ref} data-scope="footer" data-part="left-col" />;
    },
    { displayName: 'LeftCol' },
);

export const Version = forward<PropsWithChildren, 'span'>(
    (props, ref) => {
        return <styled.span {...props} ref={ref} data-scope="footer" data-part="version" />;
    },
    { displayName: 'Version' },
);

export const Copyright = forward<PropsWithChildren, 'span'>(
    (props, ref) => {
        return <styled.span {...props} ref={ref} data-scope="footer" data-part="copyright" />;
    },
    { displayName: 'Copyright' },
);

export const Content = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        return <styled.div {...props} ref={ref} data-scope="footer" data-part="content" />;
    },
    { displayName: 'Content' },
);
