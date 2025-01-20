import { forward } from '@optimacros-ui/store';
import { useApi } from '../../exports';

export const Area = forward<{}, 'div'>(
    (_, ref) => {
        const api = useApi();

        return (
            <div {...api.getAreaProps()} ref={ref}>
                <div {...api.getAreaBackgroundProps()} />
                <div {...api.getAreaThumbProps()} />
            </div>
        );
    },
    { displayName: 'Area' },
);
