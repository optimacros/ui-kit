import { forward, styled } from '@optimacros-ui/store';

export const Root = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="list" data-part="root" />
));

export const Item = forward<{}, 'li'>((props, ref) => (
    <styled.li {...props} ref={ref} data-scope="list" data-part="item" />
));

export const Header = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="list" data-part="header" />
));

export const Footer = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="list" data-part="footer" />
));

export const List = forward<{}, 'ul'>((props, ref) => (
    <styled.ul {...props} ref={ref} data-scope="list" data-part="list" />
));
