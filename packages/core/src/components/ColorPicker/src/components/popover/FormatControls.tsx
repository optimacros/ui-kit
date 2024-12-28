import { forward } from '@optimacros-ui/store';
import { useApi } from '../../exports';

export const HSL = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <div {...props} ref={ref}>
                <div>
                    <input {...api.getChannelInputProps({ channel: 'hue' })} />
                    <span>H</span>
                </div>
                <div>
                    <input
                        {...api.getChannelInputProps({
                            channel: 'saturation',
                        })}
                    />
                    <span>S</span>
                </div>
                <div>
                    <input
                        {...api.getChannelInputProps({
                            channel: 'lightness',
                        })}
                    />
                    <span>L</span>
                </div>
                {!api.disableAlpha && (
                    <div>
                        <input {...api.getChannelInputProps({ channel: 'alpha' })} />
                        <span>A</span>
                    </div>
                )}
            </div>
        );
    },
    { displayName: 'HSL' },
);

export const RGB = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <div {...props} ref={ref}>
                <div>
                    <input {...api.getChannelInputProps({ channel: 'red' })} />
                    <span>R</span>
                </div>
                <div>
                    <input {...api.getChannelInputProps({ channel: 'green' })} />
                    <span>G</span>
                </div>
                <div>
                    <input {...api.getChannelInputProps({ channel: 'blue' })} />
                    <span>B</span>
                </div>
                {!api.disableAlpha && (
                    <div>
                        <input {...api.getChannelInputProps({ channel: 'alpha' })} />
                        <span>A</span>
                    </div>
                )}
            </div>
        );
    },
    { displayName: 'RGB' },
);

export const HSB = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <div {...props} ref={ref}>
                <div>
                    <input {...api.getChannelInputProps({ channel: 'hue' })} />
                    <span>H</span>
                </div>
                <div>
                    <input
                        {...api.getChannelInputProps({
                            channel: 'saturation',
                        })}
                    />
                    <span>S</span>
                </div>
                <div>
                    <input
                        {...api.getChannelInputProps({
                            channel: 'brightness',
                        })}
                    />
                    <span>B</span>
                </div>
                {!api.disableAlpha && (
                    <div>
                        <input {...api.getChannelInputProps({ channel: 'alpha' })} />
                        <span>A</span>
                    </div>
                )}
            </div>
        );
    },
    { displayName: 'HSB' },
);
