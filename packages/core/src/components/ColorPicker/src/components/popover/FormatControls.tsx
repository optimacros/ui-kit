import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../exports';
import { Flex } from '@optimacros-ui/flex';

export const HSL = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <Flex {...props} ref={ref}>
                <styled.div>
                    <styled.input {...api.getChannelInputProps({ channel: 'hue' })} />
                    <span>H</span>
                </styled.div>
                <styled.div>
                    <styled.input
                        {...api.getChannelInputProps({
                            channel: 'saturation',
                        })}
                    />
                    <span>S</span>
                </styled.div>
                <styled.div>
                    <styled.input
                        {...api.getChannelInputProps({
                            channel: 'lightness',
                        })}
                    />
                    <span>L</span>
                </styled.div>
                {!api.disableAlpha && (
                    <styled.div>
                        <styled.input {...api.getChannelInputProps({ channel: 'alpha' })} />
                        <span>A</span>
                    </styled.div>
                )}
            </Flex>
        );
    },
    { displayName: 'HSL' },
);

export const RGB = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <Flex {...props} ref={ref}>
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
            </Flex>
        );
    },
    { displayName: 'RGB' },
);

export const HSB = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <Flex {...props} ref={ref}>
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
            </Flex>
        );
    },
    { displayName: 'HSB' },
);

export const HEX = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <Flex {...props} ref={ref}>
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
            </Flex>
        );
    },
    { displayName: 'HEX' },
);
