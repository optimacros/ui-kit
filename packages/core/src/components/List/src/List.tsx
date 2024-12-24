import { forward, styled } from '@optimacros-ui/store';

export const Root = forward<{}, 'ul'>((props, ref) => (
    <styled.ul {...props} ref={ref} data-scope="list" data-part="root" />
));

export const Item = forward<{}, 'li'>((props, ref) => (
    <styled.li {...props} ref={ref} data-scope="list" data-part="item" />
));
