import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';

export const Arrow = forward<{}, 'div'>((_, ref) => {
    const api = useApi();

    return (
        <styled.div {...api.getArrowProps()} ref={ref}>
            <div {...api.getArrowTipProps()} />
        </styled.div>
    );
});
