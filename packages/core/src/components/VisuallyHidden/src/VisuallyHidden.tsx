import { PropsWithChildren } from 'react';
import { forward, styled } from '@optimacros-ui/store';

export const VisuallyHidden = forward<PropsWithChildren, 'span'>((props, ref) => (
    <styled.span {...props} data-scope="visually-hidden" data-part="root" ref={ref} />
));
