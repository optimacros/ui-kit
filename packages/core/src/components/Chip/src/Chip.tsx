import { forward, styled } from '@optimacros-ui/store';

export const Root = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="chip" data-part="root" />
));

export const Icon = forward<{}, 'span'>((props, ref) => (
    <styled.span role="button" {...props} ref={ref} data-scope="chip" data-part="icon" />
));

export const Avatar = forward<{}, 'img'>((props, ref) => (
    <styled.img role="button" {...props} ref={ref} data-scope="chip" data-part="avatar" />
));
