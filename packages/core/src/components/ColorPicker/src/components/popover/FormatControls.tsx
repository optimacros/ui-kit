import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../exports';
import { Flex } from '@optimacros-ui/flex';
import { FC, PropsWithChildren } from 'react';

export const ChannelInputContainer: FC<PropsWithChildren> = ({ children, ...rest }) => (
    <Flex direction="column" gap={2} justify="center" align="center" {...rest}>
        {children}
    </Flex>
);

export const HSL = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <Flex {...props} ref={ref}>
                <ChannelInputContainer>
                    <styled.input {...api.getChannelInputProps({ channel: 'hue' })} />
                    <span>H</span>
                </ChannelInputContainer>
                <ChannelInputContainer>
                    <styled.input
                        {...api.getChannelInputProps({
                            channel: 'saturation',
                        })}
                    />
                    <span>S</span>
                </ChannelInputContainer>
                <ChannelInputContainer>
                    <styled.input
                        {...api.getChannelInputProps({
                            channel: 'lightness',
                        })}
                    />
                    <span>L</span>
                </ChannelInputContainer>
                {!api.disableAlpha && (
                    <ChannelInputContainer>
                        <styled.input {...api.getChannelInputProps({ channel: 'alpha' })} />
                        <span>A</span>
                    </ChannelInputContainer>
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
                <ChannelInputContainer>
                    <input {...api.getChannelInputProps({ channel: 'red' })} />
                    <span>R</span>
                </ChannelInputContainer>
                <ChannelInputContainer>
                    <input {...api.getChannelInputProps({ channel: 'green' })} />
                    <span>G</span>
                </ChannelInputContainer>
                <ChannelInputContainer>
                    <input {...api.getChannelInputProps({ channel: 'blue' })} />
                    <span>B</span>
                </ChannelInputContainer>
                {!api.disableAlpha && (
                    <ChannelInputContainer>
                        <input {...api.getChannelInputProps({ channel: 'alpha' })} />
                        <span>A</span>
                    </ChannelInputContainer>
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
                <ChannelInputContainer>
                    <input {...api.getChannelInputProps({ channel: 'hue' })} />
                    <span>H</span>
                </ChannelInputContainer>
                <ChannelInputContainer>
                    <input
                        {...api.getChannelInputProps({
                            channel: 'saturation',
                        })}
                    />
                    <span>S</span>
                </ChannelInputContainer>
                <ChannelInputContainer>
                    <input
                        {...api.getChannelInputProps({
                            channel: 'brightness',
                        })}
                    />
                    <span>B</span>
                </ChannelInputContainer>
                {!api.disableAlpha && (
                    <ChannelInputContainer>
                        <input {...api.getChannelInputProps({ channel: 'alpha' })} />
                        <span>A</span>
                    </ChannelInputContainer>
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
                <ChannelInputContainer>
                    <input {...api.getChannelInputProps({ channel: 'hue' })} />
                    <span>H</span>
                </ChannelInputContainer>
                <ChannelInputContainer>
                    <input
                        {...api.getChannelInputProps({
                            channel: 'saturation',
                        })}
                    />
                    <span>S</span>
                </ChannelInputContainer>
                <ChannelInputContainer>
                    <input
                        {...api.getChannelInputProps({
                            channel: 'brightness',
                        })}
                    />
                    <span>B</span>
                </ChannelInputContainer>
                {!api.disableAlpha && (
                    <ChannelInputContainer>
                        <input {...api.getChannelInputProps({ channel: 'alpha' })} />
                        <span>A</span>
                    </ChannelInputContainer>
                )}
            </Flex>
        );
    },
    { displayName: 'HEX' },
);
