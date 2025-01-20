import { forward } from '@optimacros-ui/store';
import { useApi } from '../../exports';

export const TransparencySlider = forward<{}, 'div'>(
    (_, ref) => {
        const api = useApi();

        return (
            <div {...api.getChannelSliderProps({ channel: 'alpha' })} ref={ref}>
                <div {...api.getTransparencyGridProps({ size: '12px' })} />
                <div
                    {...api.getChannelSliderTrackProps({
                        channel: 'alpha',
                    })}
                />
                <div
                    {...api.getChannelSliderThumbProps({
                        channel: 'alpha',
                    })}
                />
            </div>
        );
    },
    { displayName: 'TransparencySlider' },
);
