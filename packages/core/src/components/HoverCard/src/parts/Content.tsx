import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../state';

export const Content = forward<{}, 'div'>(({ size, ...rest }, ref) => {
    const api = useApi();

    return <styled.div {...rest} {...api.getContentProps()} ref={ref} />;
});
