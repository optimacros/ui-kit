import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../exports';

export const Area = forward<{}, 'div'>(
    (_, ref) => {
        const api = useApi();

        return (
            <styled.div {...api.getAreaProps()} ref={ref}>
                <styled.div {...api.getAreaBackgroundProps()} />
                <styled.div {...api.getAreaThumbProps()} />
            </styled.div>
        );
    },
    { displayName: 'Area' },
);
