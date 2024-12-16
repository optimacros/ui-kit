import { forward, styled } from '@optimacros-ui/store';

export const Root = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="chip" data-part="root" />
));

export const Icon = forward<{}, 'div'>((props, ref) => (
    <styled.div role="button" {...props} ref={ref} data-scope="chip" data-part="icon" />
));
