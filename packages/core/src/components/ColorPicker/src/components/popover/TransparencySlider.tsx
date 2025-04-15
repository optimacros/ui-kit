import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../exports';

export const TransparencySlider = forward<{}, 'div'>(
    (_, ref) => {
        const api = useApi();

        return (
            <styled.div {...api.getChannelSliderProps({ channel: 'alpha' })} ref={ref}>
                <styled.div {...api.getTransparencyGridProps({ size: '12px' })} />
                <styled.div
                    {...api.getChannelSliderTrackProps({
                        channel: 'alpha',
                    })}
                />
                <styled.div
                    {...api.getChannelSliderThumbProps({
                        channel: 'alpha',
                    })}
                />
            </styled.div>
        );
    },
    { displayName: 'TransparencySlider' },
);
