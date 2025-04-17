import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../exports';

export const ChannelSlider = forward<{}, 'div'>(
    (_, ref) => {
        const api = useApi();

        return (
            <styled.div {...api.getChannelSliderProps({ channel: 'hue' })} ref={ref}>
                <styled.div
                    {...api.getChannelSliderTrackProps({
                        channel: 'hue',
                    })}
                />
                <styled.div
                    {...api.getChannelSliderThumbProps({
                        channel: 'hue',
                    })}
                />
            </styled.div>
        );
    },
    { displayName: 'ChannelSlider' },
);
