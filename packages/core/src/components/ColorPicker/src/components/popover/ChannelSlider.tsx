import { forward } from '@optimacros-ui/store';
import { useApi } from '../../exports';

export const ChannelSlider = forward<{}, 'div'>(
    (_, ref) => {
        const api = useApi();

        return (
            <div {...api.getChannelSliderProps({ channel: 'hue' })} ref={ref}>
                <div
                    {...api.getChannelSliderTrackProps({
                        channel: 'hue',
                    })}
                />
                <div
                    {...api.getChannelSliderThumbProps({
                        channel: 'hue',
                    })}
                />
            </div>
        );
    },
    { displayName: 'ChannelSlider' },
);
