import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';

export const Content = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getContentProps()} ref={ref} />;
});
